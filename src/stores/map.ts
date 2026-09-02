import axios from "axios";
import { defineStore } from "pinia";
import { ref } from "vue";

export interface Map {
  uuid: string;
  displayName: string;
  displayIcon?: string;
  splash?: string; 
  listViewIcon?: string; 
}

export const useMapStore = defineStore("maps", () => {
  const allMaps = ref<Map[]>([]);

  function fetchData() {
    axios.get('https://valorant-api.com/v1/maps?language=ru-RU')
      .then(response => {
        const unratedMapNames = [
          'Abyss',
          'Ascent',
          'Bind',
          'Breeze',
          'Corrode',
          'Fracture',
          'Haven',
          'Icebox',
          'Lotus',
          'Pearl',
          'Split',
          'Summit',
          'Sunset'
        ];
        
        allMaps.value = response.data.data
          .filter((map: any) => unratedMapNames.includes(map.displayName))
          .map((map: any) => ({
            uuid: map.uuid,
            displayName: map.displayName,
            splash: map.splash,
            displayIcon: map.displayIcon,
            listViewIcon: map.listViewIcon
          }));
        
        console.log('Загружено карт для анрейта:', allMaps.value.length);
        console.log('Список карт:', allMaps.value.map(m => m.displayName));
      })
      .catch(error => {
        console.error('Ошибка:', error);
      });
  }

  const mapId = ref('')

  return {
    mapId,
    allMaps,
    fetchData,
  };
});