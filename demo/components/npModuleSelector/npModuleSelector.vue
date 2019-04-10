<template>
<div class="np-module-selector" :class="{viewer: mode=='view'}" v-if='modules'>
	<ul class="main">
		<li v-for='mod in modules' :class="['li-' + mod.checkType, {focused: mod.isFocused}]">
			<a :class="[mod.checkType]" @click='focusModule(mod)'>
				<span class="icon" @click.stop='checkModule(mod)'></span><span>{{ mod.name }}</span>
			</a>
		</li>
	</ul>
	<div class="sub">
		 <np-module-list :modules='focusedModule ? focusedModule.children : []'>
			<template scope="props">
				<a :class="[props.mod.checkType]" @click.stop='checkModule(props.mod)'>
					<span class="icon" ></span><span>{{ props.mod.name }}</span>
				</a>
			</template>
		</np-module-list>
	</div>
</div>
</template>

<script>
import npModuleList from './npModuleList';

function iterateTree(mod, fn) {
	IX.iterate(mod.children, function (item) {
		iterateTree(item, fn);
	});
	fn(mod);
}
function setModCheckType(mod, checkType, setCheckTypeFn) {
	iterateTree(mod, function (item) {
		if (IX.isFn(setCheckTypeFn))
			setCheckTypeFn(item, checkType);
		else
			item.checkType = checkType;
	});
}
function iterateItems(items, acc, fn) {
	IX.iterate(items, function (item) {
		var _acc = fn(acc, item);
		if (_acc === false) return;
		iterateItems(item.children, _acc, fn);
	});
}
function resetCheckType(modules, ids) {
	var hasNone = true, hasAll = true;
	var id = ids.shift();
	IX.iterate(modules, function (mod) {
		var checkType = mod.checkType;
		if (mod.id == id && ids.length > 0) {
			checkType = resetCheckType(mod.children, ids);
			mod.checkType = checkType;
		}
		if (checkType != 'none') hasNone = false;
		if (checkType != 'all') hasAll = false;
	});
	return hasAll ? 'all' : (hasNone ? 'none' : 'part');
}
function calcChecked(modules) {
	var checked = [], hasAll = true;
	IX.iterate(modules, function (mod) {
		if (mod.checkType == 'all')
			return checked.push(mod.idPath);
		hasAll = false;
		if (mod.checkType != 'none')
			checked = checked.concat(calcChecked(mod.children).checked);
	});
	return {
		hasAll: hasAll,
		checked: checked
	};
}
function resetWithValue(modules, val, setCheckTypeFn) {
	var checkType = 'all', _ht = {};
	if (val == 'all' || IX.isEmpty(val)) {
		checkType = val == 'all' ? val : 'none';
		IX.iterate(modules, function (mod) {
			setModCheckType(mod, checkType, setCheckTypeFn);
		});
		return val == 'all' ? val : [];
	}

	IX.iterate(val, function (idPath) {
		var ids = idPath.split('/');
		_ht[idPath] = 'all';
		ids.pop();
		while (ids.length > 0) {
			_ht[ids.join('/')] = 'part';
			ids.pop();
		}
	});
	iterateItems(modules, true, function (acc, mod) {
		var idPath = mod.idPath;
		var _checkType = idPath in _ht ? _ht[idPath] : 'none';
		if (_checkType != 'part') {
			setModCheckType(mod, _checkType, setCheckTypeFn);
			return false;
		}
		mod.checkType = _checkType;
		return acc;
	});
	return calcChecked(modules).checked;
}
/**
 * props : [
 *		mode : 展示模式 : 'view' or other
 * 		modules : 节点数据 : [{id,name, // basic attribute for all modules and sub-modules;
 *			children,			// attribute for node if not isLeaf
 *			isFocused,			// inner-reserved: module is focused only for main modules
 *			idPath, 			// inner-reserved: "ancestor-id/.../parent-id/my-id"
 *			checkType			// inner-reserved: "all", "none" or "part"; default:none
 *		}],
 *		value : "all" | [] | ["ancestor-id/.../parent-id/child-id", ... ]// 最小选中集合
 * ]
 * events : [
 *		input : 数据改变事件: // 最小选中集合
 * ]
 */
export default{
	props: {
		mode: { type: String, default: 'view' },
		modules: { type: Array, default: function () { return []; } },
		value: { type: [Array, String], default: function () { return []; } }
	},
	data: function () {
		return {
			focusedModule: null,
			checked: []
		};
	},
	watch: {
		value: function (val) {
			this.checked = resetWithValue(this.modules, val, function(mod, value){
				this.$set(mod, 'checkType', value);
			}.bind(this));
		},
		modules: function (val) {
			this.modules = val;
			iterateItems(this.modules, '', function (acc, mod) {
				var idPath = (IX.isEmpty(acc) ? '' : (acc + '/')) + mod.id;
				mod.idPath = idPath;
				this.$set(mod, 'checkType', 'none');
				this.$set(mod, 'isFocused', false);
				return idPath;
			}.bind(this));
			this.focusedModule = $XP(this.modules, "0", null);
			if (this.focusedModule)
				this.focusedModule.isFocused = true;
		}
	},
	methods: {
		focusModule: function (mod) {
			this.focusedModule.isFocused = false;
			this.focusedModule = mod;
			mod.isFocused = true;
		},
		tryEmit: function () {
			var result = calcChecked(this.modules);
			var oldVal = this.checked;
			var val = result.checked;
			var i = 0;

			this.checked = val;

			if (result.hasAll) {
				if (oldVal != 'all')
					this.$emit('input', 'all');
				return;
			}
			if (oldVal == 'all' || val.length != oldVal.length)
				return this.$emit('input', val);

			for (i = 0; i < val.length; i += 1) {
				if (val[i] != oldVal[i])
					return this.$emit('input', val);
			}
		},
		checkModule: function (mod) {
			if (this.mode == 'view')
				return;
			setModCheckType(mod, mod.checkType != 'none' ? 'none' : 'all');
			resetCheckType(this.modules, mod.idPath.split('/'));
			this.tryEmit();
		}
	},
	components: {
		'np-module-list': npModuleList
	}
};
</script>
<style lang="less">
@import '../../less/ixwpre.less';

.np-module-selector {
	overflow: auto;
	background:#fff;
	height:100%;
	padding-left: 140px;
	a {
		display:inline-block;color:#444;
		width:140px;height:40px; padding:12px 0 12px 20px;
		span { vertical-align: top;}
	}
	a:hover{font-weight:bold;color:#444;}
	.icon {.x-pic;width:14px;height:14px;.x-pic-icon14-uncheck;margin-right:8px;}
	.part>.icon{.x-pic-icon14-part-checked;}
	.all>.icon{.x-pic-icon14-checked;}
	li{display:block;}
	.main {
		float:left;width:140px;padding:10px 0;margin-left:-140px;background:#f6f6f6;
		li {width:100%;height:40px;font-size:14px;}
		li.focused{background:white;font-weight:bold;}
	}
	.sub{
		float: left; font-size:12px;background:white;width: 100%;
	}
	.level1 {
		min-height: 95%;margin:10px 10px 10px 25px;padding:0;
		a {padding: 0 0 10px 10px;height:24px;width: 130px; }
		&>li {padding:18px 10px 8px;border-bottom:1px dashed #ccc;min-height:50px; }
		&>li>a {display:block;float:left;}
	}
	.level2 {
		margin-left:130px; text-align:left;
		&>li {display:inline-block;width:130px;height:16px;margin-bottom:10px;overflow:hidden;}
	}
}
.np-module-selector.viewer {
	.icon, .li-none {display:none;}
}
</style>
