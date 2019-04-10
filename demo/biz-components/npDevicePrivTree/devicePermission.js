function iterateTree(items, fn) {
	IX.iterate(items, function (item) {
		fn(item);
		iterateTree(item.children || [], fn);
	});
}
function iterateTreeNode(treeNode, fn) {
	fn(treeNode);
	iterateTree(treeNode.children, function (node) {
		if (!node.isLeaf) fn(node);
	});
}

function createTree(parentNode, items, fn) {
	var hasOpened = false;
	return IX.map(items, function (item) {
		var node = fn(item, parentNode);
		var _children = item.children;
		var hasChild = !!(_children && _children.length > 0);
		var shouldOpen = !hasOpened && hasChild;

		hasOpened = hasOpened || shouldOpen;
		node.isOpen = shouldOpen;
		node.childLoaded = hasChild;
		node.children = hasChild ? createTree(node, _children, fn) : [];
		return node;
	});
}
function getNodeId(nodetype, itemId) {
	return nodetype + '+' + itemId;
}
function getTreeNodeId(nodetype, gid) {
	return getNodeId(nodetype == 'self' ? 'self' : 'group', gid);
}
function getLeafNodeId(itemid) {
	return getNodeId('resource', itemid);
}
function convertLeafNodes(nodelist, deviceType) {
	return IX.map(nodelist, function (leafNode) {
		return {
			id: leafNode[0],
			name: leafNode[1],
			type: deviceType,
			isLeaf: true
		};
	});
}

/* 权限的四种数据形式：
 	arr: [0,1,1,0,0]
 	string: '01100'
 	names: ['live', 'history']
 	obj: {'live': true, 'history': true}
 */
function PermConvertor(privNames) {
	var defaultPrivIdx = {}, allPrivObj = {};
	var numOfPrivs = privNames.length;

	function _loopPrivs(acc0, fn) {
		return IX.loop(privNames, acc0, fn);
	}
	function checkIfHasPriv(privObj, privName) {
		if (privName) 
			return $XP(privObj, privName, false);
		return _loopPrivs(false, function (acc, name) {
			return acc || $XP(privObj, name, false);
		});
	}
	IX.iterate(privNames, function (privName, idx) {
		defaultPrivIdx[privName] = idx;
		allPrivObj[privName] = true;
	});

	return {
		allPrivObj: allPrivObj,
		permArrIsEqual: function (arr1, arr2) {
			var i = 0;
			if (!arr1 || !arr2)
				return (!arr1 && !arr2);
			for (i = 0; i < numOfPrivs; i += 1)
				if (arr1[i] !== arr2[i]) return false;
			return true;
		},
		toggle: function (oldPriv, privName) {
			var ifAllPriv = !privName;
			var hasPriv = checkIfHasPriv(oldPriv, privName);
			// fullPrivObj 在点击checkbox的情况下是完全权限列表，无论其为真或假
			// 在单击单项权限时，该权限必然存在，无论其为真或假
			return IX.inherit(oldPriv, _loopPrivs({}, function (acc, name) {
				if (ifAllPriv || name == privName)
					acc[name] = !hasPriv;
				return acc;
			}));
		},
		simplifyObj: function (fullPrivObj) {
			return _loopPrivs({}, function (acc, privName) {
				if ($XP(fullPrivObj, privName))
					acc[privName] = true;
				return acc;
			});
		},
		// example： {'live': true, 'history': true} & {'download': true} ==> {}
		joinObj: function (privObj1, privObj2) {
			return _loopPrivs({}, function (acc, privName) {
				if ($XP(privObj1, privName) && $XP(privObj2, privName))
					acc[privName] = true;
				return acc;
			});
		},
		// example: ['live', 'history']
		// 	    ==>{ obj:{'live': true, 'history': true}, arr :[0,1,1,0,0,0]}
		names2ArrAndObj: function (names) {
			var permArr = IX.Array.init(numOfPrivs, 0);
			var privObj = {};
			IX.iterate(names, function (privName) {
				permArr[defaultPrivIdx[privName]] = 1;
				privObj[privName] = true;
			});
			return { arr: permArr, obj: privObj };
		},
		// example: "011000" ==> ['live', 'history']
		string2Names: function (str) {
			return IX.loop(str.split(''), [], function (acc, value, idx) {
				if (value > 0)
					acc.push(privNames[idx]);
				return acc;
			});
		},
		// example: {'live': true, 'history': true} ==> [0,1,1,0,0,0]
		obj2Arr: function (privObj) {
			var hasPriv = false;
			var perm = IX.map(privNames, function (privName) {
				var _hasPriv = $XP(privObj, privName, false);
				hasPriv = hasPriv || _hasPriv;
				return _hasPriv ? 1 : 0;
			});
			return hasPriv ? perm : null;
		},
		// example: [0,1,1,0,0] ==> '01100'
		arr2String: function (permArr) {
			return permArr ? permArr.join('') : '';
		},
		// example: [0,1,1,0,0,0] ==> {'live': true, 'history': true}
		arr2Obj: function (permArr) {
			return _loopPrivs({}, function (acc, privName, idx) {
				if (permArr[idx] > 0) acc[privName] = true;
				return acc;
			});
		}
	};
}

function PermStore(cvtor) {
	// 全部权限许可信息：{nodeId : [0,1,..]} // 0: none, 1: has
	var permHT = new IX.IListManager();
	// 实时数据：非叶子节点的权限信息：{nodeId: {privName: true}}
	var treeNodePriv = {};

	function iterateLeaf(siblings, fn) {
		IX.iterate(siblings, function (sibling) { fn(sibling[0]); });
	}
	function iterateGroup(siblings, fn) {
		IX.iterate(siblings, function (sibling) { fn(sibling.id); });
	}

	function calcLeafPriv(leafId, containerPriv) {
		return IX.inherit(containerPriv, cvtor.arr2Obj(permHT.get(leafId) || []));
	}
	function getNodePriv(nodeId) {
		return $XP(treeNodePriv, nodeId, {});
	}
	function getLeafPriv(leafId, containerId) {
		return calcLeafPriv(leafId, getNodePriv(containerId));
	}
	function getNodePermArr(nodeId) {
		return cvtor.obj2Arr(getNodePriv(nodeId));
	}
	function getPrivObjFromPermHT(nodeId) {
		return cvtor.arr2Obj(permHT.get(nodeId));
	}
	function updatePermArr(nodeId, permArr, parentPermArr) {
		permHT.register(nodeId, cvtor.permArrIsEqual(parentPermArr, permArr) ? null : permArr);
	}
	function _calcContainerPrivObj(siblings, basePrivObj, itemFn) {
		return IX.loop(siblings, basePrivObj, function (acc, sibling) {
			return cvtor.joinObj(acc, itemFn(sibling[0]));
		});
	}
	function serialize(parentIdHT) {
		var privData = new IX.I1ToNManager();
		permHT.iterate(function (permArr, nodeId) {
			var arr = nodeId.split('+');
			var permString = cvtor.arr2String(permArr);
			var key = [arr[0], permString];
			if (arr[0] == 'resource') 
				key.push(parentIdHT[nodeId]);
			privData.put(key.join('+'), arr[1]);
		});
		return IX.map(privData.getKeys(), function (key) {
			var arr = key.split('+');
			var permObj = {
				type: arr[0],
				ids: privData.get(key),
				perm: cvtor.string2Names(arr[1])
			};
			if (arr[0] == 'resource')
				permObj.group = arr.pop();
			return permObj;
		});
	}
	return {
		iterateLeafSiblingPermArr: function (siblings, fn) {
			iterateLeaf(siblings, function (siblingId) {
				fn(siblingId, permHT.get(siblingId));
			});
		},

		getLeafPriv: getLeafPriv,
		getNodePriv: function (nodeId, parentId) {
			return parentId ? getLeafPriv(nodeId, parentId) : getNodePriv(nodeId);
		},
		// 查询权限信息：指定非叶子节点和指定叶子容器节点下的叶子节点， nodeId:optional
		queryGroupPrivs: function (groupIds, containerId, leafNodeIds) {
			var privObjs = {};
			var containerPriv = containerId ? getNodePriv(containerId) : null;

			if (containerPriv)
				IX.iterate(leafNodeIds, function (leafId) {
					privObjs[leafId] = calcLeafPriv(leafId, containerPriv);
				});
			IX.iterate(groupIds, function (id) {
				if (id in treeNodePriv)
					privObjs[id] = IX.inherit(treeNodePriv[id]);
			});
			return privObjs;
		},

		calcLeafPermArr: function (leafId, coveredPriv) {
			return cvtor.obj2Arr(IX.inherit(getPrivObjFromPermHT(leafId), coveredPriv));
		},
		calcTreeNodePrivObj: function (nodeId, coveredPriv) {
			return IX.inherit(getNodePriv(nodeId), coveredPriv);
		},
		calcParentNodePrivObj: function (siblings, coveredPriv) {
			return IX.loop(siblings, coveredPriv, function (acc, sibling) {
				return cvtor.joinObj(acc, getNodePriv(sibling.id));
			});
		},
		calcContainerPrivObj: function (siblings, defaultSiblingPrivObj, leafId, privObj) {
			return _calcContainerPrivObj(siblings, cvtor.allPrivObj, function (siblingId) {
				if (siblingId == leafId)
					return privObj;
				else if (permHT.hasKey(siblingId))
					return getPrivObjFromPermHT(siblingId);
				return defaultSiblingPrivObj;
			});
		},
		tmpCalcContainerPrivObj: function (siblings, defaultSiblingPrivObj, leafId, privObj) {
			return _calcContainerPrivObj(siblings, defaultSiblingPrivObj, function (siblingId) {
				return siblingId == leafId ? privObj : getPrivObjFromPermHT(siblingId);
			});
		},
		coverNodePermArr: updatePermArr,
		coverTreeNodePriv: function (nodeId, _privObj) {
			treeNodePriv[nodeId] = cvtor.simplifyObj(_privObj);
		},
		coverTreeSiblingPermArr: function (siblings, parentPermArr) {
			iterateGroup(siblings, function (siblingId) {
				updatePermArr(siblingId, getNodePermArr(siblingId), parentPermArr);
			});
		},
		extendTreeNodePriv: function (nodeId, privObj) {
			treeNodePriv[nodeId] = IX.inherit(getNodePriv(nodeId), privObj);
		},

		serialize: serialize
	};
}

function ContainerTaskManager(serviceCaller) {
	// 存储容器节点加载叶子节点任务清单：
	// {containerNodeId : {privObj: {privName: true}, cbFn : [function(leafNodes),....]}, ... }
	var taskHT = new IX.IListManager();
	function initTask(nodeId, attr, cbFn) {
		var task = {
			attr: attr,
			cbFn: []
		};
		taskHT.register(nodeId, task);
		serviceCaller('listResource', { id: nodeId.split('+')[1] }, function (data) {
			var result = cbFn(data);
			var taskAttr = task.attr;
			IX.iterate(task.cbFn || [], function (fn) {
				if (IX.isFn(fn)) fn(result, taskAttr);
			});
			taskHT.remove(nodeId);
		});
	}
	return {
		initTask: initTask,
		pushTaskCB: function (nodeId, cbFn) {
			var task = taskHT.get(nodeId);
			if (task) task.cbFn.push(cbFn);
		},
		insertTaskCBAsFirst: function (nodeId, cbFn) {
			var task = taskHT.get(nodeId);
			if (task) task.cbFn.unshift(cbFn);
		},
		get: function (nodeId) {
			return taskHT.get(nodeId);
		},
		getTaskAttr: function (nodeId) {
			var task = taskHT.get(nodeId);
			return task ? task.attr : null;
		},
		resetTaskAttr: function (nodeId, attr) {
			var task = taskHT.get(nodeId);
			if (task) task.attr = attr;
		},
		isEmpty: function () {
			return taskHT.isEmpty();
		}
	};
}

function DevicePermission(deviceType, privNames, serviceCaller, afterInitFn) {
	var cvtor = new PermConvertor(privNames);
	var store = new PermStore(cvtor);
	var ctm = new ContainerTaskManager(serviceCaller);

	// 树形结构数据：[TreeNode, ...]
	var treeData = [];
	// 非叶子节点数据：
	// {nodeId : {id,name,type,isLeaf:false,isOpen:!hasLeaf,childLoaded:!hasLeaf,children:[TreeNode]}
	var treeNodeHT = {};
	// 特定容器下的所有叶子节点列表：{containerNodeId : [leafNode, [id, name],...]
	var leafNodesHT = {};
	// 非叶子节点ID列表
	var treeNodeIdList = [];
	// 父子关系：{childId : parentId}
	var parentIdHT = {};
	// permHT中叶子节点和其父容器的对应关系：{containerNodeId: [leafNodeId, ....]}
	var permLeafIdHT = new IX.I1ToNManager();

	// nodetype: group/self/resource
	function getContainerNodeId(gid) {
		var nodeId = getNodeId('self', gid);
		return (nodeId in treeNodeHT) ? nodeId : getNodeId('group', gid);
	}
	function createNonLeafNode(item, parentNode) {
		var nodeId = getTreeNodeId(item.type, item.id);
		var node = {
			id: nodeId,
			name: item.name,
			type: 'group',
			isLeaf: false
		};

		treeNodeIdList.push(nodeId);
		parentIdHT[nodeId] = $XP(parentNode, 'id', null);
		treeNodeHT[nodeId] = node;
		return node;
	}
	function createLeafNode(item, parentId) {
		var leafId = getLeafNodeId(item.id);
		parentIdHT[leafId] = parentId;
		return [leafId, item.name];
	}

	function _parseNodePriv(nodeId, privObj) {
		iterateTreeNode(treeNodeHT[nodeId], function (node) {
			store.extendTreeNodePriv(node.id, privObj);
		});
	}
	function parsePriv(permObj) {
		var nodetype = permObj.type;
		var privInfo = cvtor.names2ArrAndObj(permObj.perm || []);
		var privObj = privInfo.obj;
		var permArr = privInfo.arr;
		var containerNodeId = nodetype == 'resource' ? getContainerNodeId(permObj.group) : null;

		IX.iterate(permObj.ids || [], function (itemId) {
			var nodeId = getNodeId(nodetype, itemId);
			store.coverNodePermArr(nodeId, permArr);
			if (!containerNodeId) // 非叶子节点
				_parseNodePriv(nodeId, privObj);
			else {
				permLeafIdHT.put(containerNodeId, nodeId);
				parentIdHT[nodeId] = containerNodeId;
			}
		});
	}

	// 查询权限信息：非叶子节点和指定叶子容器节点下的叶子节点， nodeId:optional
	function queryGroupPrivs(nodeId) {
		var leafNodeIds = [];
		if (nodeId)
			leafNodeIds = IX.map($XP(leafNodesHT, nodeId, []), function (leafNode) {
				return leafNode[0];
			});
		return store.queryGroupPrivs(treeNodeIdList, nodeId, leafNodeIds);
	}
	// 用于搜索；查询指定叶子节点列表的权限信息，ifNodeList==true: 返回树形节点列表，
	function queryDevicePrivs(devices, ifNodeList) {
		var privs = {}, nodes = [];
		IX.iterate(devices, function (item) {
			var nodeId = getContainerNodeId(item.gid);
			var leafId = getLeafNodeId(item.id);
			if (ifNodeList)
				nodes.push(createLeafNode(item, nodeId));
			privs[leafId] = store.getLeafPriv(leafId, nodeId);
		});
		return {
			data: convertLeafNodes(nodes, deviceType),
			privs: privs
		};
	}

	function loadLeafs(nodeId, cbFn, callFirst) {
		var task = ctm.get(nodeId);
		if (task) // 数据在加载中，还未取回来，等待回来后一并响应
			return ctm[callFirst ? 'insertTaskCBAsFirst' : 'pushTaskCB'](nodeId, cbFn);
		// 生成新的任务
		ctm.initTask(nodeId, store.getNodePriv(nodeId), function (devices) {
			var nodeList = IX.map(devices, function (item) {
				return createLeafNode(item, nodeId);
			});
			leafNodesHT[nodeId] = nodeList;
			return nodeList;
		});
		ctm.pushTaskCB(nodeId, cbFn);
	}
	function openContainerNode(nodeId, cbFn, callFirst) {
		if (nodeId in leafNodesHT) // 数据已经加载
			return cbFn(leafNodesHT[nodeId]);
		loadLeafs(nodeId, cbFn, callFirst);
	}
	function tryAppendLeafNodes(nodeId) {
		var node = treeNodeHT[nodeId];
		var leafNodes = leafNodesHT[nodeId];
		if (!node || !leafNodes)
			return;
		node.childLoaded = true;
		node.children = convertLeafNodes(leafNodes, deviceType);
	}

	function trySetLeafPermArr(parentId, leafId, leafPermArr, parentPermArr) {
		var permArr = cvtor.permArrIsEqual(leafPermArr, parentPermArr) ? null : leafPermArr;
		if (permArr)
			permLeafIdHT.put(parentId, leafId);
		else
			permLeafIdHT.remove(parentId, leafId);
		store.coverNodePermArr(leafId, permArr);
	}

	function _resetSibingGroupPriv(parentId, fullPrivObj) {
		var parentNode = treeNodeHT[parentId];
		var siblings = parentNode.children;
		var newPriv = store.calcParentNodePrivObj(siblings, fullPrivObj);
		var _permArr = _resetParentGroupPriv(parentNode, newPriv);

		store.coverTreeSiblingPermArr(siblings, _permArr);
	}
	function _resetParentGroupPriv(node, fullPrivObj) {
		var nodeId = node.id;
		var parentId = parentIdHT[nodeId];
		var permArr = cvtor.obj2Arr(fullPrivObj);

		store.coverTreeNodePriv(nodeId, fullPrivObj);
		if (!parentId) // 当前节点是根节点
			store.coverNodePermArr(nodeId, permArr);
		else
			_resetSibingGroupPriv(parentId, fullPrivObj);
		return permArr;
	}
	function _resetChildGroupPriv(node, fullPrivObj, parentPermArr) {
		var nodeId = node.id;
		var _privObj = store.calcTreeNodePrivObj(nodeId, fullPrivObj);
		var _permArr = cvtor.obj2Arr(_privObj);

		store.coverTreeNodePriv(nodeId, _privObj);
		store.coverNodePermArr(nodeId, _permArr, parentPermArr);

		_resetChildrenPriv(node, _privObj, _permArr);
	}
	function _resetChildrenPriv(parentNode, fullPrivObj, parentPermArr) {
		var parentId = parentNode.id;
		var task = ctm.get(parentId);
		if (task) // 存在容器任务， 更新容器权限
			ctm.resetTaskAttr(parentId, cvtor.simplifyObj(fullPrivObj));

		if (permLeafIdHT.hasValue(parentId)) { // 容器节点
			IX.iterate(permLeafIdHT.get(parentId), function (leafId) {
				var permArr = store.calcLeafPermArr(leafId, fullPrivObj);
				trySetLeafPermArr(parentId, leafId, permArr, parentPermArr);
			});
			task = 'hasLeaf'; // 仅用于中断返回
		}
		if (task || parentId in leafNodesHT) // parentNode是容器节点，不用继续
			return;
		IX.iterate(parentNode.children, function (node) {
			if (!node.isLeaf) // 防止漏网的容器节点
				_resetChildGroupPriv(node, fullPrivObj, parentPermArr);
		});
	}
	function resetGroupPriv(node, fullPrivObj) {
		// 更新祖先节点权限和perm，自我向上更新
		var permArr = _resetParentGroupPriv(node, fullPrivObj);
		// 更新下属节点权限和perm
		_resetChildrenPriv(node, fullPrivObj, permArr);
	}

	function _tmpInheritContainerPriv(leafId, privObj, parentId, saveParentPriv, parentPermArr) {
		var siblings = leafNodesHT[parentId];
		var newParentPriv = store.tmpCalcContainerPrivObj(siblings, saveParentPriv,
				leafId, privObj);
		var newParentPermArr = cvtor.obj2Arr(newParentPriv);
		// 改变了容器节点的权限信息，自我向上更新
		if (!cvtor.permArrIsEqual(parentPermArr, newParentPermArr))
			_resetParentGroupPriv(treeNodeHT[parentId], newParentPriv);
	}
	// 临时更新叶子节点以及向上的权限，
	function _tmpResetLeafPriv(leafId, privObj, parentId, saveParentPriv) {
		var permArr = cvtor.obj2Arr(privObj);
		var parentPermArr = cvtor.obj2Arr(store.getNodePriv(parentId));

		// 第一步：先保存当前节点的权限信息
		trySetLeafPermArr(parentId, leafId, permArr);
		// 和容器节点权限一致，在permHT中重置，不需要向上梳理
		if (cvtor.permArrIsEqual(permArr, parentPermArr))
			return;

		// 第二步：假设其他兄弟节点都是继承原来的父节点权限；
		_tmpInheritContainerPriv(leafId, privObj, parentId, saveParentPriv, parentPermArr);
	}
	function _resetLeafPrivComplex(leafId, privObj, permArr, parentId, parentPriv, parentPermArr) {
		var siblings = leafNodesHT[parentId];
		var newParentPriv = store.calcContainerPrivObj(siblings, parentPriv, leafId, privObj);
		var newParentPermArr = cvtor.obj2Arr(newParentPriv);

		// 未改变容器节点的权限信息,但和当前节点不一致，需要更新permHT
		if (cvtor.permArrIsEqual(parentPermArr, newParentPermArr))
			return trySetLeafPermArr(parentId, leafId, permArr);

		// 改变了容器节点的权限信息
		// 第一步：先更新当前节点的权限信息，不同则添加进permHT, 否则移除
		trySetLeafPermArr(parentId, leafId, permArr, newParentPermArr);
		// 第二步：更新容器下其他子节点的permHT信息
		store.iterateLeafSiblingPermArr(siblings, function (siblingId, _permArr) {
			if (siblingId == leafId)
				return;
			if (!_permArr) // 没在permHT, 需要继承原来的父节点权限信息
				trySetLeafPermArr(parentId, siblingId, parentPermArr);
			else // 在permHT中，如果父节点的新权限信息一致，可以移除否则保留
				trySetLeafPermArr(parentId, siblingId, _permArr, newParentPermArr);
		});
		//  第三步：自我向上更新
		_resetParentGroupPriv(treeNodeHT[parentId], newParentPriv);
	}
	function _resetLeafPriv(leafId, privObj, parentId) {
		var permArr = cvtor.obj2Arr(privObj);
		var parentPriv = store.getNodePriv(parentId);
		var parentPermArr = cvtor.obj2Arr(parentPriv);

		// 和容器节点权限一致，只需要可以将当前节点从permHT中移除，不需要向上梳理
		if (cvtor.permArrIsEqual(permArr, parentPermArr))
			return trySetLeafPermArr(parentId, leafId);
		// 和容器节点权限不一致，需要分情况处理；
		_resetLeafPrivComplex(leafId, privObj, permArr, parentId, parentPriv, parentPermArr);
	}
	// 计算nodelist相关的权限聚合；更新store
	function recalcPerms(parentId, nodelist, oldParentPriv) {
		var oldParentPermArr = cvtor.obj2Arr(oldParentPriv);
		var curParentPermArr = cvtor.obj2Arr(store.getNodePriv(parentId));
		var newParentPriv = store.calcContainerPrivObj(nodelist, oldParentPriv);
		var newParentPermArr = cvtor.obj2Arr(newParentPriv);
		var shouldInherited = !cvtor.permArrIsEqual(newParentPermArr, oldParentPermArr);

		// 第一步：更新容器下其他子节点的permHT信息, 不同则保留在permHT, 否则移除
		store.iterateLeafSiblingPermArr(nodelist, function (siblingId, _permArr) {
			if (!_permArr) { // 没在permHT, 需要继承原来的父节点权限信息
				if (shouldInherited) // 父节点的权限发生了变化，继承原来的权限
					trySetLeafPermArr(parentId, siblingId, oldParentPermArr);
			} else // 在permHT中，如果和父节点的新权限信息一致，可以移除，否则保留
				trySetLeafPermArr(parentId, siblingId, _permArr, newParentPermArr);
		});
		//  第二步：如果当前的权限信息和计算出来的权限信息不一致，则自我向上更新
		if (!cvtor.permArrIsEqual(curParentPermArr, newParentPermArr))
			_resetParentGroupPriv(treeNodeHT[parentId], newParentPriv);
	}
	function setLeafPriv(nodeId, privObj) {
		var parentId = parentIdHT[nodeId];
		if (parentId in leafNodesHT)// 兄弟节点数据已经加载
			return _resetLeafPriv(nodeId, privObj, parentId);
		// 此处代码顺序不可颠倒！
		if (!ctm.get(parentId))// 还未启动兄弟节点数据加载任务, 启动任务；
			openContainerNode(parentId, function (nodelist, oldPriv) {
				recalcPerms(parentId, nodelist, oldPriv);
			}, 'callFirst');
		// 临时修改权限
		_tmpResetLeafPriv(nodeId, privObj, parentId, ctm.getTaskAttr(parentId));
	}

	// 搜索模式下，关于同一容器节点下的节点操作权限，需要从服务器加载兄弟节点进行计算操作，
	// 为避免异步操作导致的异常数据，禁止在兄弟节点数据未加载到本地时，在进行同类操作。
	function setPriv(nodeId, privName) {
		var arr = nodeId.split('+');
		var isResource = arr[0] == 'resource';
		var oldPriv = store.getNodePriv(nodeId, isResource ? parentIdHT[nodeId] : null);
		// fullPrivObj 在点击checkbox的情况下是完全权限列表，无论其为真或假
		// 在单击单项权限时，该权限必然存在，无论其为真或假
		var fullPrivObj = cvtor.toggle(oldPriv, privName);

		if (isResource) // 叶子节点
			setLeafPriv(nodeId, cvtor.simplifyObj(fullPrivObj));
		else
			resetGroupPriv(treeNodeHT[nodeId], fullPrivObj);
		return true;
	}

	// 初始化数据
	serviceCaller('listGroup', {}, function (groups) { // 加载所有非叶子节点
		treeData = createTree(null, groups, createNonLeafNode);
		serviceCaller('listPermission', {}, function (privs) { // 加载整体权限数据信息
			IX.iterate(privs, parsePriv);
			afterInitFn({ data: treeData, privs: queryGroupPrivs() });
		});
	});

	return {
		// 更新指定叶子容器节点的下属叶子节点列表, cbFn();
		openGroup: function (nodeId, cbFn) {
			openContainerNode(nodeId, function () {
				tryAppendLeafNodes(nodeId);
				cbFn();
			});
		},
		// 设置单个节点权限条目;
		// return:  true: 成功，false: 需要等待，操作无效
		setPriv: setPriv, // function(nodeId, privName)
		// 用于搜索；查询指定叶子节点列表的权限信息，ifNodeList==true: 返回树形节点列表，
		// return: {data:[], privs: {}}
		queryDevicePrivs: queryDevicePrivs, // function(devices, ifNodeList)
		// 查询树结构以及权限信息：非叶子节点和指定叶子容器节点下的叶子节点
		queryTreePrivs: function (nodeId) {
			tryAppendLeafNodes(nodeId);
			return {
				data: treeData,
				privs: queryGroupPrivs(nodeId)
			};
		},
		// 查询权限信息：非叶子节点和指定叶子容器节点下的叶子节点, 没有nodeId则认为没有展开叶子节点
		// return {id: {privName: boolean}}
		queryGroupPrivs: queryGroupPrivs, // function(nodeId)
		// 取得完整的权限数据信息；如果权限任务未完成，最终结果没有形成，不能序列化
		// return null  || [{type, ids, perm}]
		getPrivData: function () {
			return ctm.isEmpty() ? store.serialize(parentIdHT) : null;
		}
	};
}

module.exports = DevicePermission;
