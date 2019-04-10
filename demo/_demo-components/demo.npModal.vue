<!-- testModal.vue -->
<template>
	<np-modal :title='"标题"' :clz='"test-dialog"'
			v-bind='$props'
			@confirm='confirm'>
		<template slot="header1">
			My Header
		</template>
		<template>
			<p>{{ bodyMsg }}</p>
			{{ msg }} <br>
		</template>
	</np-modal>
</template>
<script>
import npModal from '../../components/npModal/npModal';
import modalMixin from '../../components/npModal/npModalMixin';

export default {
	mixins: [modalMixin],
	props: {
		bodyMsg: { type: String },
		onOK: { type: Function }
	},
	data: function () {
		return {
			msg: 'My name is msg'
		};
	},
	methods: {
		confirm: function (modalId) {
			/* eslint-disable no-console */
			console.log('Confirmed: ', modalId);
			if (IX.isFn(this.onOK))
				this.onOK();
		}	
	},
	components: {
		npModal
	}
};
</script>

<style lang="less">
.np-modal.test-dialog {
	left:40px;right:40px;top:80px;height:400px;

	.body {min-height:310px;}
}
</style>

<!-- callTestModal.vue -->
<template>
	<div>
		<a @click="openModal"> open</a>
	</div>
</template>

<script>
import testModal from './testModal';

export default {
	methods: {
		openModal: function(){
			var self = this;
			var modal = this.$modal.create({
				component: testModal,
				options: {
					mask: true
				},
				props: {
					transition: 'fall',

					bodyMsg: 'Just test body',
					onOK: function () {
						console.log("OK!");
						//self.openModal();
						modal.animateDestory(400);
					}
				}
			});
		}
	}
}
</script>

<!-- App.vue -->
<template>
	<div id="app">
		...
		<np-modals />
	</div>
</template>

<script>
import npModals from './components/npModal/npModals';

export default {
	name: 'app',
	components: {
		npModals
	}
};
</script>
