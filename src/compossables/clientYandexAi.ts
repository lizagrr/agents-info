// composables/useYandexAPI.ts
export const useYandexAPI = () => {
  const API_KEY = import.meta.env.VITE_OPENAI_API_KEY
  const FOLDER_ID = import.meta.env.VITE_OPENAI_FOLDER_ID

  const getRecommendation = async (maps: string[], agents: string[]) => {
    const mapsString = maps.join(', ')
    const agentsString = agents.join(', ')
    
    const prompt = `Привет! Мы сейчас находимся на карте ${mapsString}. Мои тиммейты пикнули ${agentsString}. Помоги мне выбрать пятого агента к нам в команду, чтобы выиграть. Дай мне несколько вариантов и максимально короткое объяснение, чем это будет полезно`

    // 📝 Прямой запрос к Yandex Completion API
    const response = await fetch('/api/foundationModels/v1/completion', {
      method: 'POST',
      headers: {
        'Authorization': `Api-Key ${API_KEY}`,
        'x-folder-id': FOLDER_ID
      },
      body: JSON.stringify({
        modelUri: `gpt://${FOLDER_ID}/yandexgpt/latest`,
        completionOptions: {
          stream: false,
          temperature: 0.7,
          maxTokens: 500
        },
        messages: [
          {
            role: 'system',
            text: 'Ты профессиональный аналитик по игре Valorant'
          },
          {
            role: 'user',
            text: prompt
          }
        ]
      })
    })

    if (!response.ok) {
      const error = await response.text()
      throw new Error(`API Error: ${response.status} - ${error}`)
    }

    const data = await response.json()
    
    // 📦 Парсинг прямого ответа
    return data.result?.alternatives?.[0]?.message?.text || 'Ответ не получен'
  }

  return { getRecommendation }
}