<template>
   <p>
    выбраны агенты {{ selectedAgents }}
</p>
<p>
    карта {{ selectedMaps }}
</p>

  <v-btn @click="sendMessage()" >
    Отправить
  </v-btn>
  
  <div v-if="responseText">
    <div class="response-content" v-html="formatMarkdown(responseText)"></div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useYandexAPI } from '../../compossables/clientYandexAi'

const { getRecommendation } = useYandexAPI()

const props = defineProps<{
  selectedAgents: string[]
  selectedMaps: string[]
}>()

const emit = defineEmits<{
  (e: 'updateResponse', response: string): void
}>()

const responseText = ref('');
const loading = ref(false);


const sendMessage = async () => {
  if (!props.selectedAgents?.length) {
    responseText.value = '⚠️ Пожалуйста, выберите хотя бы одного агента'
    return
  }

  if (!props.selectedMaps?.length) {
    responseText.value = '⚠️ Пожалуйста, выберите карту'
    return
  }

  loading.value = true
  responseText.value = ''

  try {
    const result = await getRecommendation(props.selectedMaps, props.selectedAgents)
    responseText.value = result
    emit('updateResponse', result)
  } catch (error: any) {
    responseText.value = `Ошибка: ${error.message || 'Неизвестная ошибка'}`
  } finally {
    loading.value = false
  }
}



// Простой парсер Markdown. епта блять
const formatMarkdown = (text: string) => {
  if (!text) return '';
  
  let html = text
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    .replace(/^### (.*?)$/gm, '<h3>$1</h3>')
    .replace(/^## (.*?)$/gm, '<h2>$1</h2>')
    .replace(/^# (.*?)$/gm, '<h1>$1</h1>')
    .replace(/^(\d+)\. (.*?)$/gm, (match, num, text) => {
      return `<li>${text}</li>`;
    })
    .replace(/^- (.*?)$/gm, '<li>$1</li>')
    .replace(/(<li>.*?<\/li>)/gs, (match) => {
      if (match.match(/^\d+\./)) {
        return `<ol>${match}</ol>`;
      }
      return `<ul>${match}</ul>`;
    })
    .replace(/\n/g, '<br>');
  
  return html;
};



</script>