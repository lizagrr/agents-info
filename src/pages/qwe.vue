<template>

<v-container>
<v-row>
<v-col v-for="(value, index) in agentsToChange">
    <v-card @click="agentsToChange[index] = !agentsToChange[index]" :style="value ? border : ''" color="primary" style="  width: 100px;height: 100px;"></v-card>
</v-col>
</v-row>
</v-container>

</template>




<script setup lang="ts">
import { ref } from 'vue';


const agentsToChange = ref([
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
])

const border = 'border: 3px solid red;'

</script>