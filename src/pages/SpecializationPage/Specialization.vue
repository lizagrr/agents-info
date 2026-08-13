<template>
   <v-container class="pa-4">
      <v-row justify="center">
         <v-col cols="6">
            <div class="d-flex justify-center ga-4 flex-wrap">
              <v-btn 
                  v-for="role in roles"
                  :key="role.name"
                  @click="selectRole(role.name)"
               >
                  <template #prepend>
                    <div style=" width: 36px; height: 36px">
                       <img 
                           v-if="role.icon"
                           :src="role.icon"
                           :alt="role.icon"
                           style="
                           max-width: 100%;
                           max-height: 100%;
                           display: block;"
                          />
                    </div>
                 </template>
                    {{ role.name }}
              </v-btn>

              <v-btn
                 @click="selectRole('all')"
              >
                help
             </v-btn>

            </div>
          </v-col>
      </v-row>
    </v-container>
</template>

<script setup lang="ts">
const emit = defineEmits<{
  (e: 'selectRole', roleName: string): void
}>()

defineProps<{
  roles: { name: string; icon: string }[]
}>()

function selectRole(roleName: string) {
  emit('selectRole', roleName) 
}
</script>