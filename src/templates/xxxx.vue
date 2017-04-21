<template__src__></template>

<script>
import viewMixin from '../../common/views/viewMixin';

const VIEW_TITLE = '';
const VIEW_UNIQUE_NAME = '';

export default {
    name: VIEW_UNIQUE_NAME,
    ROOT_PATH: '',
    mixins: [viewMixin],
    data: function() {
        return {}
    },
    methods: {
        /**
         * @override
         */
        viewTitle: function() {
            return VIEW_TITLE;
        },
        /**
         * @override
         */
        viewUniqueName: function() {
            return VIEW_UNIQUE_NAME;
        },
    }
}
</script>