<template>
    <div class="pa-5 pt-0">
        <DashBoardGraph />
    </div>
</template>

<script>
import { HistorylogSer } from '../../api/Historylog';
import DashBoardGraph from '../../components/DashBoard/DashBoard-graph.vue';
import { dateFormatWithFixedTime } from "../../function/day";
export default {
    setup() {
        const his = new HistorylogSer();
        return {
            dateFormatWithFixedTime,
            his,
        }
    },
    components: {
        DashBoardGraph,
    }
}
</script>

<style></style>