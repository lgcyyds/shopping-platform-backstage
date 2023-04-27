<template>
    <div>
        <div class="card-header">
            <span>{{ title }}</span>
            <svg t="1680610637544" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
                p-id="2754" width="16" height="16">
                <path
                    d="M511.644913 138.506541c-206.265784 0-373.47811 167.211303-373.47811 373.47811S305.379129 885.461737 511.644913 885.461737 885.123023 718.250434 885.123023 511.983627 717.91172 138.506541 511.644913 138.506541zM541.873378 753.784742c0 16.954137-13.745049 30.699186-30.699186 30.699186s-30.699186-13.745049-30.699186-30.699186l0-344.854189c0-16.954137 13.745049-30.699186 30.699186-30.699186s30.699186 13.745049 30.699186 30.699186L541.873378 753.784742zM511.930415 345.877495c-21.052478 0-38.118156-17.065677-38.118156-38.118156 0-21.052478 17.065677-38.118156 38.118156-38.118156 21.052478 0 38.118156 17.065677 38.118156 38.118156C550.048571 328.810794 532.98187 345.877495 511.930415 345.877495z"
                    fill="#CCCCCC" p-id="2755"></path>
            </svg>
        </div>
        <div class="card-content">
            {{ count }}
        </div>
        <div class="card-charts">
            <slot name="charts"></slot>
        </div>
        <div class="card-footer">
            <slot name="footer"></slot>
        </div>
    </div>
</template>

<script>
export default {
    props:['title',"count"]
}
</script>

<style scoped>
.card-header {
    display: flex;
    justify-content: space-between;
    color: #d9d9d9;
}
.card-content{
    font-size: 30px;
    padding: 10px 0;
}
.card-charts{
    height: 40px;
}
.card-footer{
    border-top: 1px solid #eee;
    padding-top: 10px;
}
</style>