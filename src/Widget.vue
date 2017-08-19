<template>

    <div class="widget" :style="{ width: width + 'px', height: height + 'px', left: left + 'px', top: top + 'px' }">
    <!-- Stuff, slots or something -->
    </div>

</template>

<script>
    export default {
        name: 'widget',
        data: () => ({
            width: 300,
            height: 200,
            left: 0,
            top: 0,
        }),
    }
</script>

<style lang="sass">

    .widget
        border: 1px solid #333
        border-radius: 4px
        position: absolute

</style>