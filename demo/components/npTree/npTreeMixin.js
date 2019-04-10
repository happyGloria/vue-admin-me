// treeMixin
module.exports = {
	props: {
		data: { type: Array, default: function () { return []; } },
		autoCollapse: { type: Boolean, default: true }
	},
	methods: {
		load: function (node, cbFn) {
			this.$emit('load', node, cbFn);
		},
		clickOnNode: function (node) {
			this.$emit('clickOnNode', node);
		},
		clickOnLeaf: function (node) {
			this.$emit('clickOnLeaf', node);
		},
		dbclickOnLeaf: function (node) {
			this.$emit('dbclickOnLeaf', node);
		}
	}
};
