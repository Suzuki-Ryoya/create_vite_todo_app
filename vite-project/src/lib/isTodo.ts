//todo型かどうかを判断する関数(x is Tはtype predicateと呼ばれ,関数の戻り値がbooleanである)
const isTodo = (arg: any): arg is Todo => {
  return (
    typeof arg === "object" &&
    typeof arg.id === "number" &&
    typeof arg.value === "string" &&
    typeof arg.checked === "boolean" &&
    typeof arg.removed === "boolean"
  );
};

//配列全てがTodo型であるかどうかを判定する関数
export const isTodos = (arg: any): arg is Todo[] => {
  return Array.isArray(arg) && arg.every(isTodo);
};
