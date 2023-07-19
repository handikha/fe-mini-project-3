export default function UsersTable({ users }) {
  return (
    <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table class="text-gray-500 dark:text-gray-400 w-full text-left text-sm">
        <thead class="text-gray-700 dark:bg-gray-700 dark:text-gray-400 bg-slate-100 text-sm uppercase dark:bg-slate-800">
          <tr>
            <th scope="col" class="px-6 py-3">
              #
            </th>
            <th scope="col" class="px-6 py-3">
              Username
            </th>
            <th scope="col" class="px-6 py-3">
              Email
            </th>
            <th scope="col" class="px-6 py-3">
              Phone
            </th>
            <th scope="col" class="px-6 py-3">
              Status
            </th>
            <th scope="col" class="px-6 py-3">
              Role
            </th>
            <th scope="col" class="px-6 py-3">
              Full Name
            </th>
            <th scope="col" class="px-6 py-3">
              Image
            </th>
            <th scope="col" class="px-6 py-3">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {users.map((item, index) => (
            <tr class="duration-300 odd:bg-slate-200 even:bg-slate-100 dark:odd:bg-slate-700 dark:even:bg-slate-800">
              <th
                scope="row"
                class="text-gray-900 whitespace-nowrap px-6 py-4 font-medium dark:text-white"
              >
                {index + 1}
              </th>
              <td class="px-6 py-4">{item.username}</td>
              <td class="px-6 py-4">{item.email}</td>
              <td class="px-6 py-4">{item.phone}</td>
              <td class="px-6 py-4">{item.status}</td>
              <td class="px-6 py-4">{item.role}</td>
              <td class="px-6 py-4">{item.fullName}</td>
              <td class="px-6 py-4">
                <div className="aspect-[4/3] w-10">
                  <img
                    src={item.profileImg}
                    alt=""
                    className="h-full w-full object-cover"
                  />
                </div>
              </td>
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
