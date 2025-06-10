<template>
    <div class="pt-0 pb-5">
        <DashBoardGraph :centerDate="startDate" />
    </div>
</template>

<script>
import { HistorylogSer } from '../../api/Historylog';
import DashBoardGraph from '../../components/DashBoard/DashBoard-graph.vue';
import { dateFormatWithFixedTime } from "../../function/day";
export default {
    props: {
        centerDate: Date
    },
    setup() {
        const his = new HistorylogSer();
        return {
            dateFormatWithFixedTime,
            his,
        }
    },
    watch: {
        centerDate(newVal) {
            this.startDate = newVal
        }
    },
    components: {
        DashBoardGraph,
    },
    data: () => ({
        startDate: new Date(),
    })
}
</script>

<style></style>