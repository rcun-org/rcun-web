const transformMsgHistoryToGroup = (historyArr) =>
  historyArr.reduce((acc, currV) => {
    const lastArrInAcc = acc.slice(-1)?.[0];

    if (
      lastArrInAcc &&
      lastArrInAcc[lastArrInAcc.length - 1]?.username === currV.username
    ) {
      const arrayToAdd = [...lastArrInAcc, currV];

      acc = [...acc.slice(0, -1), arrayToAdd];
      return acc;
    }

    acc = [...acc, [currV]];
    return acc;
  }, []);

export default transformMsgHistoryToGroup;
