const room1 = {
  name: "AnandaPG",

  location:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7374.2958486254!2d88.31658252530303!3d22.46107485592182!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a027a83cf4b287b%3A0xecfde7bfc0c653e5!2sChak%20Thakurani%2C%20West%20Bengal!5e0!3m2!1sen!2sin!4v1631224644068!5m2!1sen!2sin",
  contact: 97572424,
  type: "Double Room",
  description: "Lorem ipsum Medium",
  distance: 5,
  ratings: 4.7,
  price: 9000,
  image:
    "https://content.jdmagicbox.com/comp/kolkata/n4/033pxx33.xx33.131212161106.m2n4/catalogue/comfort-motel-salt-lake-city-sector-5-kolkata-paying-guest-accommodations-for-men-j754suos5t.jpg?clr=",
  deposit: 4500,
  main: "yes",
  notice: 4,
  food: "yes",
  parking: "yes",
  beds: 5,
  tennants: 12,
  twinsharing: "yes",
  since: 2000,
};
room1.id = room1.name;

const room2 = {
  name: "NetuxDelux",

  location:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d20563.384567668112!2d88.36733645102368!3d22.50900002190176!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a027726b8d82ef9%3A0x8bd778cd1c7aced4!2sApollo%20Gleneagles%20Medical%20Centre%2C!5e0!3m2!1sen!2sin!4v1631224783863!5m2!1sen!2sin",
  contact: 97572424,
  type: "Double Room",
  description: "Lorem ipsum Medium",
  distance: 5,
  ratings: 4.7,
  price: 9000,
  image:
    "https://s3.ap-south-1.amazonaws.com/www.cimg.in/images/2012/08/23/21/127936008_13633404051_large.jpg",
  deposit: 4500,
  main: "yes",
  notice: 4,
  food: "yes",
  parking: "yes",
  beds: 5,
  tennants: 12,
  twinsharing: "yes",
  since: 2000,
};
room2.id = room2.name;

const room3 = {
  name: "SavitaHomes",
  location: "www.google.com",
  location:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14743.994348693124!2d88.31426053143609!3d22.504236187270354!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a027a1de5ad5ebb%3A0x30c48bbd82d66397!2sTaratala%20Police%20Station!5e0!3m2!1sen!2sin!4v1631224857876!5m2!1sen!2sin",
  contact: 97572424,
  type: "Double Room",
  description: "Lorem ipsum Medium",
  distance: 5,
  ratings: 4.7,
  price: 9000,
  image:
    "https://content3.jdmagicbox.com/comp/kolkata/p4/033pxx33.xx33.180403202012.n7p4/catalogue/archana-girls-pg-kolkata-0aeaa6umtj.jpg?clr=333333",
  deposit: 4500,
  main: "yes",
  notice: 4,
  food: "yes",
  parking: "yes",
  beds: 5,
  tennants: 12,
  twinsharing: "yes",
  since: 2000,
};
room3.id = room3.name;

const rooms = [room1, room2, room3];

let start;
const cardGroups = document.querySelectorAll(".card-group");
let ind = 0;
const displayPG = function (rooms) {
  let div;
  rooms.forEach(function (room, i) {
    console.log(i);

    if (i % 3 == 0) {
      start = i;
      div = document.createElement("div");
      div.setAttribute("class", "card-group");
      document.body.appendChild(div);
    }
    const html = `<div class="card">
    <img
       src="${room.image}"
      class="card-img-top"
      alt="..."
    />
    <div class="card-body">
      <h5 class="card-title">${room.name}</h5>
      <p class="card-text">${room.description}</p>
      <span class="badge badge-primary"></span>
      <span class="badge badge-secondary">Mess Available</span>
      <span class="badge badge-success">Boys & Girls</span>
      <span class="badge badge-danger">Vaccinated</span>
      <br />
      <button
        class="btn btn-primary"
        type="button"
        data-toggle="collapse"
        data-target="#${room.id}"
        aria-expanded="false"
        aria-controls="${room.id}"
      >
        Read more...
      </button>
    </div>
    </div>`;
    if (i % 3 != 2) {
      div.insertAdjacentHTML("afterbegin", html);
    } else {
      div.insertAdjacentHTML("afterbegin", html);
      console.log(div);
      for (let j = start; j <= i; ++j) {
        console.log("j", j);
        let div2 = document.createElement("div");
        div2.setAttribute("class", "collapse card mb-3");
        div2.setAttribute("id", `${rooms[j].id}`);
        document.body.appendChild(div2);
        const html2 = ` <div class="row no-gutters">
        <div class="col-md-4">
          <iframe
           src="${rooms[j].location}"
            width="100%"
            height="450"
            style="border: 0"
            allowfullscreen=""
            loading="lazy"
          ></iframe>
        </div>
        <div class="col-md-8">
          <div class="card-body">
            <h5 class="card-title">${rooms[j].name}</h5>
            <p class="card-text">
              Paying Guest is available for rent. Move into a professionally
              managed Paying Guest. In Santoshpur, south Kolkata. Located on
              main road , Market and all types of conveyance at door steps. This
              male Paying Guest offers various modern amenities for your
              comfort, such as TV, AC, Laundry Service, Wi-Fi etc. This Paying
              Guest has single, double occupancy types.
            </p>
            <div class="contact-button">
              <button type="button" class="bf btn btn-danger">
                Contact Owner
              </button>
              <button type="button" class="bf btn btn-danger">
                View Phone Number
              </button>
            </div>
            <div>
              <ul class="list-group">
                <li
                  class="list-group-item d-flex justify-content-between align-items-center"
                >
                  Deposit Amount
                  <span class="badge badge-primary badge-pill">3500</span>
                </li>
                <li
                  class="list-group-item d-flex justify-content-between align-items-center"
                >
                  Maintanence
                  <span class="badge badge-primary badge-pill">-</span>
                </li>
                <li
                  class="list-group-item d-flex justify-content-between align-items-center"
                >
                  Notice Period
                  <span class="badge badge-primary badge-pill">1 month</span>
                </li>
              </ul>
              <ul class="list-group">
                <li
                  class="list-group-item d-flex justify-content-between align-items-center"
                >
                  Food Availability
                  <span class="badge badge-primary badge-pill">Veg</span>
                </li>
                <li
                  class="list-group-item d-flex justify-content-between align-items-center"
                >
                  Parking
                  <span class="badge badge-primary badge-pill">Yes</span>
                </li>
                <li
                  class="list-group-item d-flex justify-content-between align-items-center"
                >
                  Number of Beds
                  <span class="badge badge-primary badge-pill">4</span>
                </li>
              </ul>

              <ul class="list-group">
                <li
                  class="list-group-item d-flex justify-content-between align-items-center"
                >
                  Preferred Tennants
                  <span class="badge badge-primary badge-pill">All</span>
                </li>
                <li
                  class="list-group-item d-flex justify-content-between align-items-center"
                >
                  Twin Sharing
                  <span class="badge badge-primary badge-pill">Yes</span>
                </li>
                <li
                  class="list-group-item d-flex justify-content-between align-items-center"
                >
                  Operating Since
                  <span class="badge badge-primary badge-pill">2007</span>
                </li>
              </ul>
            </div>

            <br />
          </div>
        </div>
      </div>`;
        div2.insertAdjacentHTML("afterbegin", html2);
        console.log(div2);
      }
    }
  });
};
displayPG(rooms);
