const handleNextReviewAt = step => {
  const now = Date.now();
  switch (step) {
    case 0:
      return 24 * 60 * 60 * 1000 + now;
    case 1:
      return 3 * 24 * 60 * 60 * 1000 + now;
    case 2:
      return 10 * 24 * 60 * 60 * 1000 + now;
    case 3:
      return 30 * 24 * 60 * 60 * 1000 + now;
    case 4:
      return 4 * 30 * 24 * 60 * 60 * 1000 + now;
    default:
      return now;
  }
};

export default {
  reject: (card, callback) => {
    const newCard = {
      ...card,
      step: 0,
      isDone: false,
      nextReviewAt: Date.now() + 10 * 60 * 1000,
      countRejected: card.countRejected + 1
    };
    callback(newCard);
  },
  accept: (card, callback) => {
    const newCard = {
      ...card,
      step: card.step + 1,
      nextReviewAt: handleNextReviewAt(card.step),
      isDone: card.step >= 5
    };
    callback(newCard);
  }
};
