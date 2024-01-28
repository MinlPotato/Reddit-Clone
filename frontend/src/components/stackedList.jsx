function StackedList() {
  const people = [
    {
      name: "Calvin Hawkins",
      email: "calvin.hawkins@example.com",
      image:
        "https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
    {
      name: "Kristen Ramos",
      email: "kristen.ramos@example.com",
      image:
        "https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
    {
      name: "Ted Fox",
      email: "ted.fox@example.com",
      image:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
     {
      name: "Calvin Hawkins",
      email: "calvin.hawkins@example.com",
      image:
        "https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
  ];

  console.log(people.map);

  return (
    <>
     
    <div className="bg-gray-900 absolute right-5 bottom-5 rounded-2xl">
        <div className="flex">
            <h1 className="text-lg text-justify text-primary font-bold ml-3 my-3 ">Messages</h1>
            <div className="rounded-full h-5 w-5 mt-1 bg-primary  place-content-center">
                <p className="text-center text-sm"> {people.length} </p>
            </div>
        </div>
        

        <ul className="overflow-y-scroll snap-y max-h-80 px-3">
        {people.map((person) => (
          <li
            key="person.email"
            className="py-7 px-4 flex snap-center rounded-bl-2xl rounded-tr-2xl my-3  odd:bg-gray-700 even:bg-gray-600  "
          >
            <img
              className="ml-3 h-20 w-20 rounded-full"
              src={person.image}
              alt=""
            />
            <div className="ml-5">
              <p className="text-sm font-bold text-stone-100 text-justify ">
                {person.name}
              </p>
              <p className="text-sm text-justify text-stone-300 overflow-hidden">
                {person.email}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
      
    </>
  );
}

export default StackedList;
