// gridMixin 
module.exports = { 
	methods: {
		check: function (arr) {
			this.$emit('check', arr);
		},
		clickRow: function (item) {
			this.$emit('clickRow', item);
		},
		actionFn: function (name, item) {
			this.$emit('action', name, item);
		},
		page: function (pageNo, pageSize) {
			this.$emit('page', pageNo, pageSize);
		}
	}
};
