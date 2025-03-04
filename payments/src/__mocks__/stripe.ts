export const stripe = {
  paymentIntents: {
    create: jest
      .fn()
      .mockResolvedValue(
        (subject: string, data: string, callback: () => void) => {
          callback();
        }
      ),
  },
};
