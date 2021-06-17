import _ from "lodash";

export default function paginate(items, pageSize, pageNum) {
  const startIndex = (pageNum - 1) * pageSize;
  return _(items).slice(startIndex).take(pageSize).value();
}
