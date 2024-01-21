const keyId = (): string => {
  const timestamp = new Date().getTime();
  const randomValue = Math.floor(Math.random() * 100000);

  return `${timestamp}-${randomValue}`;
};

export default keyId;
