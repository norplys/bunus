const thArray = new Array(6).fill(null);
export default function TableLoading() {
  return (
    <tr className="text-center animate-pulse">
      {thArray.map((_, index) => (
        <th
          key={index}
          className="border-b-2 p-4 bg-gray-200 animate-pulse"
        ></th>
      ))}
    </tr>
  );
}
