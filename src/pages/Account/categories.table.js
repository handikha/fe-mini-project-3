export default function CategoriesTable({ categories }) {
  return (
    <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table class="text-gray-500 dark:text-gray-400 w-full text-left text-sm">
        <thead class="text-gray-700 dark:bg-gray-700 dark:text-gray-400 bg-slate-100 text-sm uppercase dark:bg-slate-800">
          <tr>
            <th scope="col" class="px-6 py-3">
              #
            </th>
            <th scope="col" class="px-6 py-3">
              Category Name
            </th>
            <th scope="col" class="px-6 py-3">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {categories.map((item, index) => (
            <tr class="duration-300 odd:bg-slate-200 even:bg-slate-100 dark:odd:bg-slate-700 dark:even:bg-slate-800">
              <th
                scope="row"
                class="text-gray-900 whitespace-nowrap px-6 py-4 font-medium dark:text-white"
              >
                {index + 1}
              </th>
              <td class="px-6 py-4">{item.name}</td>
              <td class="px-6 py-4">
                <a
                  href="#"
                  class="font-medium text-blue-600 hover:underline dark:text-blue-500"
                >
                  Edit
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
