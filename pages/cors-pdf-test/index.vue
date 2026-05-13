<template>
  <div style="padding: 24px; font-family: sans-serif; max-width: 700px;">
    <h1>KurocoFiles PDF CORSエラー 再現ページ</h1>
    <p>
      KurocoFiles に保存された PDF の URL を入力して「フェッチ」ボタンを押すと、<br />
      ブラウザの <code>fetch()</code> でリクエストを送信します。<br />
      CORSエラーが発生する場合はコンソールおよび下部のログに表示されます。
    </p>

    <div style="margin: 16px 0;">
      <label for="pdf-url"><strong>PDF URL</strong></label><br />
      <input
        id="pdf-url"
        v-model="pdfUrl"
        type="text"
        placeholder="https://fir-kuroco-xxxx.appspot.com/files/..."
        style="width: 100%; padding: 8px; margin-top: 4px; box-sizing: border-box;"
      />
    </div>

    <button
      :disabled="!pdfUrl || loading"
      style="padding: 8px 20px; cursor: pointer;"
      @click="fetchPdf"
    >
      {{ loading ? 'フェッチ中...' : 'フェッチ' }}
    </button>

    <div v-if="logs.length" style="margin-top: 24px;">
      <h2 style="font-size: 1rem;">ログ</h2>
      <div
        v-for="(log, i) in logs"
        :key="i"
        :style="{ color: log.type === 'error' ? '#c0392b' : log.type === 'success' ? '#27ae60' : '#333', marginBottom: '6px', fontFamily: 'monospace' }"
      >
        <span style="color: #888;">[{{ log.time }}]</span> {{ log.message }}
      </div>
    </div>

    <div v-if="objectUrl" style="margin-top: 24px;">
      <h2 style="font-size: 1rem;">取得成功 — PDFプレビュー</h2>
      <iframe :src="objectUrl" width="100%" height="500px" style="border: 1px solid #ccc;" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'CorsPdfTestPage',
  data() {
    return {
      pdfUrl: '',
      loading: false,
      logs: [],
      objectUrl: null,
    }
  },
  beforeUnmount() {
    if (this.objectUrl) {
      URL.revokeObjectURL(this.objectUrl)
    }
  },
  methods: {
    addLog(message, type = 'info') {
      const time = new Date().toLocaleTimeString('ja-JP')
      this.logs.push({ time, message, type })
    },
    async fetchPdf() {
      this.logs = []
      this.objectUrl = null
      this.loading = true

      const url = this.pdfUrl.trim()
      this.addLog(`フェッチ開始: ${url}`)

      try {
        const response = await fetch(url)
        this.addLog(`ステータス: ${response.status} ${response.statusText}`, 'success')

        const blob = await response.blob()
        this.addLog(`Content-Type: ${blob.type}`, 'success')
        this.addLog(`サイズ: ${blob.size} bytes`, 'success')

        this.objectUrl = URL.createObjectURL(blob)
        this.addLog('フェッチ成功。プレビューを表示します。', 'success')
      } catch (err) {
        this.addLog(`エラー: ${err.name}: ${err.message}`, 'error')
        this.addLog('※ CORSエラーの場合、ブラウザのコンソールに詳細が表示されます。', 'error')
        console.error('[cors-pdf-test] fetch error:', err)
      } finally {
        this.loading = false
      }
    },
  },
}
</script>
