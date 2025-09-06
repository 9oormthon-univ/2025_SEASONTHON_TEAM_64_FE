import ApiBuilder from '../config/builder/ApiBuilder';

const sendFortune = (description: string) => {
  return ApiBuilder.create<{ description: string }, void>(
    '/api/v1/fortunes/send',
  )
    .setMethod('POST')
    .setData({ description });
};

const getFortune = () => {
  return ApiBuilder.create<
    void,
    {
      id: number;
      description: string;
    }
  >('/api/v1/fortunes/open').setMethod('POST');
};

export { sendFortune, getFortune };
