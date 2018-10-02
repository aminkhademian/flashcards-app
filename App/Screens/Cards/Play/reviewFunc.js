const handleRewiew = {
  reject: (card, callback) => {
    const newCard = {
      ...card,
      step: 0,
      nextReviewAt: Date.now() + 10 * 60 * 1000,
      countRejected: card.countRejected + 1
    };
    callback(newCard);
  }
};

export default handleRewiew;
