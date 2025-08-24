export const QUIZ_STYLES = {
    // ボタンスタイル
    buttons: {
      primary: "bg-gradient-to-r from-green-500 to-blue-500 text-white font-bold py-4 px-8 rounded-xl hover:from-green-600 hover:to-blue-600 transform hover:scale-105 transition-all duration-200 shadow-lg text-xl",
      secondary: "bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold py-4 px-8 rounded-xl hover:from-blue-600 hover:to-purple-600 transform hover:scale-105 transition-all duration-200 shadow-lg text-xl",
      retry: "w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold py-4 px-6 rounded-xl hover:from-purple-700 hover:to-pink-700 transform hover:scale-105 transition-all duration-200 shadow-lg",
      choice: "cursor-pointer bg-gray-50 hover:bg-pink-300 hover:text-white border-2 border-gray-200 hover:border-transparent text-gray-800 hover:text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 transform hover:scale-105 shadow-md hover:shadow-lg text-lg"
    },
    
    // カードスタイル（モバイル最適化）
    cards: {
      blue: "bg-gradient-to-r from-blue-500 to-cyan-500 text-white text-2xl md:text-4xl font-bold py-3 md:py-4 px-4 md:px-6 rounded-xl mb-4 shadow-lg",
      pink: "bg-gradient-to-r from-pink-400 to-rose-400 text-white text-2xl md:text-4xl font-bold py-3 md:py-4 px-4 md:px-6 rounded-xl mb-4 shadow-lg",
      red: "bg-gradient-to-r from-red-400 to-red-400 text-white text-2xl md:text-4xl font-bold py-3 md:py-4 px-4 md:px-6 rounded-xl mb-4 shadow-lg"
    },
    
    // ヘッダーバッジ
    badges: {
      question: "bg-blue-100 px-4 py-2 rounded-full",
      questionText: "text-blue-800 font-semibold",
      score: "bg-purple-100 px-4 py-2 rounded-full",
      scoreText: "text-purple-800 font-semibold"
    },
    
    // メッセージ（色調整版）
    messages: {
      correct: "bg-red-100 border-2 border-red-300 text-red-800 px-4 py-2 rounded-xl shadow-lg",
      incorrect: "bg-gray-100 border-2 border-gray-300 text-gray-800 px-4 py-2 rounded-xl shadow-lg animate-pulse",
      timeout: "bg-yellow-100 border-2 border-yellow-300 text-yellow-800 px-4 py-2 rounded-xl shadow-lg"
    },
    
    // ヒント表示（メッセージ統合版）
    hints: {
      container: "flex flex-col items-center justify-center mb-4 space-y-3",
      box: "bg-gradient-to-r from-blue-100 to-cyan-100 border-2 border-blue-400 px-4 py-3 rounded-xl shadow-md w-full max-w-md",
      text: "text-blue-800 font-bold text-base md:text-lg",
      icon: "text-xl mr-2",
      messageBox: "px-4 py-2 rounded-xl shadow-md w-full max-w-md text-center",
      messageText: "font-bold text-base md:text-lg"
    },
    
    // 共通レイアウト
    layout: {
      container: "min-h-screen bg-gradient-to-br from-sky-300 via-cyan-200 to-blue-300 flex items-center justify-center p-4",
      backButton: "absolute top-4 left-4 bg-white hover:bg-gray-50 text-gray-700 font-semibold py-2 px-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 border border-gray-200",
      mainCard: "bg-white rounded-3xl shadow-2xl p-8 max-w-2xl w-full",
      header: "flex justify-between items-center mb-8 mt-12 md:mt-0",
      messageArea: "mb-4 min-h-[60px] flex items-center justify-center"
    }
  } as const;