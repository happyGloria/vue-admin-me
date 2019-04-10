<template>
	<div>
		<span>系统授权</span>
		<np-device-priv-tree :serviceCaller='caller' :type='devtype' 
				:mode='mode' :ifQuery='ifQueryPermision'
				@query='query' />
		<a @click="changeValue"> change</a>
		<a @click="changeMode"> change mode</a>
	</div>
</template>

<script>
/* eslint-disable */
import npDevicePrivTree from '../../biz-components/npDevicePrivTree/npDevicePrivTree';

export default {
	name: 'SamplePage2',
	data: function() {
		return {
			mode: 'view',
			devtype: 'camera',
			ifQueryPermision: false
		}
	},
	methods: {
		caller : function(name, params, cbFn){
			NP.serviceFactory.testPrivTreeService(name, params, cbFn);
		},
		query: function(permData){
			this.ifQueryPermision = false;
			console.log("Queryed:", permData);
		},
		changeValue: function(){
			this.ifQueryPermision = true;
			//this.devtype = 'iod';
		},
		changeValue: function(){
			this.mode = this.mode=="view"?"edit":"view";
		}
	},
	components: {
		npDevicePrivTree
	}
}
</script>

<style lang="less">
	.np-module-selector { width:960px; margin:20px;}
</style>

<script>
//以下皆为测试数据：

NP.serviceFactory.testPrivTreeService = function (name, params, cbFn, failFn) {
	//	console.log("enter in 1:", name );
	switch(name) {
		case "listPermission":
			setTimeout(function () {
				cbFn(Test.Priv.listPermission());
			}, 500);
			break;

		case "listGroup":
			setTimeout(function () {
				cbFn(Test.Priv.listGroup());
			}, 500);
			break;
		case "listResource":
			setTimeout(function () {
				cbFn(Test.Priv.listResource(params.id));
			}, 500);
			break;
		case "search":
			setTimeout(function () {
				cbFn(Test.Priv.search(params.key));
			}, 500);
			break;
		case "save":
			setTimeout(function () {
				console.log("Save: ", params);
			}, 500);
			break;
	}
}]
</script>

<script>
IX.ns('Test.Priv');

var Children = {}; // "type-id" : [{id,name,type},...]
var selfGroupKeys = [], commonGroupKeys = [], parentGroupKeys = [];
function genResources(id, num){
	var arr = [];
	for (var i=0; i<num; i++){
		arr.push({
			id: id + "-" + i,
			name: id + "设备" + i
		});
	}
	Children[id] = arr;
}
var MaxNumOfResourcesInGroup = 100;
var names = ["组织机构", "市局", "分局"];
var serials = ['X', 'ABCDEFG', 'abcdefghij','1234567890'];

function genSubGroups(level, hasSelf, pGroup){
	var pid = pGroup ? pGroup.id : "";
	var arr = [];
	if (hasSelf){
		arr.push({
			id: pid,
			type: "self",
			name: pGroup.name + "(本部)"
		});
		selfGroupKeys.push(pid);
		genResources(pid, MaxNumOfResourcesInGroup /2 + Math.floor(Math.random()*MaxNumOfResourcesInGroup / 2));
	}

	var serial = serials[level], name = names[level];
	serial = serial.substring(0, 3+Math.floor(Math.random() * serial.length));
	//console.log("serial:", serial);
	IX.iterate(serial.split(""), function(c1, idx){
		var grp = {
			id : pid + c1,
			name: name + c1,
			type: "group"
		}
		arr.push(grp);
		if (level >= 2) {
			commonGroupKeys.push(grp.id);
			genResources(grp.id, MaxNumOfResourcesInGroup / 2 + Math.floor(Math.random() * MaxNumOfResourcesInGroup / 2));
		} else {
			parentGroupKeys.push(grp.id);
			grp.children = genSubGroups(level + 1, Math.random() > 0.6 || (grp.id=='XA'), grp);
		}
	});
	//console.log("AAA:", arr);
	return arr;
}

var testTree = genSubGroups(0, false, null);
console.log("test tree:", testTree, "children:", Children);
console.log("selfGroupKeys:", selfGroupKeys, "commonGroupKeys:", commonGroupKeys, "parentGroupKeys:", parentGroupKeys);

var privPermissionA = [{
	type: "group",
	ids : [ testTree[0].children[1].id,  testTree[0].children[2].id],
	perm : ["live", "history", "download"]
},{
	type: "self",
	ids : [ 7,9,10,21].map(function(n){return selfGroupKeys[n % selfGroupKeys.length];}),
	perm : ["ptz"]
},{
	type: "resource",
	group: "XBa",
	ids : [ "XBa-1",  "XBa-2", "XBa-3","XBa-4"],
	perm : ["manual-record"]
}];
console.log("permission:", privPermissionA);

Test.Priv.listPermission  = function(){
	return privPermissionA;
};
Test.Priv.listGroup = function(){
	return testTree;
};
Test.Priv.listResource = function(id){
	return $XP(Children, id, []);
};
Test.Priv.search = function(key){
	var n = 31, m = 19;
	var groupIds = selfGroupKeys.concat(commonGroupKeys);
	var arr = [];
	groupIds.forEach(function(id){
		var devices = Children [id] || [];
		IX.iterate(devices, function(d, idx){
			if (idx % n !== m || arr.length>=50)
				return;
			arr.push(IX.inherit(d, {
				gid : id
			}));
		});
	});
	return arr;
};

//console.log("listGroup:", JSON.stringify(Test.Priv.listGroup()));
//console.log("listPermission:", JSON.stringify(Test.Priv.listPermission()));
//console.log("listResource:", JSON.stringify(Test.Priv.listResource(selfGroupKeys[0])));
//console.log("search:", JSON.stringify(Test.Priv.search('a')));

</script>
