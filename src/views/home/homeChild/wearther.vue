<template>
    <div id="he-plugin-standard"></div>
</template>

<script>
export default {
    name: 'wearther',
    mounted() {
        window.WIDGET = {
            "CONFIG": {
                "layout": "2",
                "width": 300,
                "height": 350,
                "background": "5",
                "dataColor": "B5AEB5",
                "borderRadius": "10",
                "key": "bd9ffdfe7a434ba2bbb984518658fba9"
            }
        }
        let script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = "https://widget.qweather.net/standard/static/js/he-standard-common.js?v=2.0";
        document.getElementsByTagName('head')[0].appendChild(script);

    }
}
</script>

<style>
</style>