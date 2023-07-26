import Button from "../../components/Button";

export default function ProfileCard({
  profileImg,
  username,
  fullName,
  handleShowModal,
  isVerified,
  context,
}) {
  const profileMenus = [
    {
      title: "Dashboard",
      path: "/admin",
    },
    {
      title: "Products",
      path: "/admin/products",
    },
    {
      title: "Users",
      path: "/admin/users",
    },
    {
      title: "Categories",
      path: "/admin/categories",
    },
  ];
  return (
    <div className='relative col-span-full md:col-span-1'>
      <div className='top-24 flex flex-col pr-4 md:sticky md:border-r-2 md:border-light dark:md:border-dark-gray'>
        <div className='flex items-center gap-x-6 md:flex-col md:items-start'>
          <div className='h-16 w-16 md:mb-4 md:aspect-square md:h-fit md:w-5/6'>
            <div className='overflow-hidden rounded-full'>
              <img
                src={"http://localhost:5000/" + profileImg}
                alt=''
                className='h-full w-full object-cover'
              />
            </div>
          </div>
          <div className='flex flex-col'>
            <h3 className='title'>{fullName}</h3>
            <p className='text-sm italic dark:text-light-gray md:text-base'>
              @{username}
            </p>
          </div>
        </div>
        <div className='mt-4 flex gap-x-6 gap-y-2 md:flex-col'>
          {profileMenus.map((menu, index) => (
            <Button
              key={index}
              isLink
              title={menu.title}
              path={menu.path}
              onClick={window.scrollTo({ top: 0, behavior: "smooth" })}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
