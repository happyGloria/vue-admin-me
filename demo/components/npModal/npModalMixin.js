// dialogMixin
module.exports = {
	props: {
		id: { type: String, required: true },
		visible: { type: Boolean, default: true },
		transition: { type: [Boolean, String], default: true }
	},
	methods: {
		close: function () {
			this.$modal.destroy(this.id);
		},
		confirm: function () {
			this.$emit('confirm', this.id);
		}
	}
};
