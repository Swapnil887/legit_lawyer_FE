function updateProfile(profileData) {
  
  if(profileData.name){
    document.getElementById("name").textContent = profileData.name;
  document.getElementById("email").textContent = profileData.email
  }else{
    document.getElementById("email").textContent = profileData.email
  }
  ;

  const appointmentData = profileData.appointment;
  const appointmentTable = document.getElementById("appointment");
  appointmentTable.innerHTML = ""; // Clear previous content

  for (const time in appointmentData) {
    const booking = appointmentData[time];
    const row = document.createElement("div");
    const timeCell = document.createElement("span");
    const bookingCell = document.createElement("span");
    const cancelButton = document.createElement("button");
    console.log("booking",booking)
    timeCell.textContent = time;
    bookingCell.textContent = booking.name;
    cancelButton.textContent = "Cancel";

    row.classList.add("appointment-row");
    timeCell.classList.add("appointment-time");
    cancelButton.classList.add("cancel-button");

    cancelButton.addEventListener("click", () => {
      const email = profileData.email;
      cancelAppointment(email, time, booking);
    });

    row.appendChild(timeCell);
    row.appendChild(bookingCell);
    row.appendChild(cancelButton);
    appointmentTable.appendChild(row);
  }
}

// Function to handle the cancellation of the appointment
async function cancelAppointment(email, time, booking) {
  console.log("....................booking")
  console.log(email, time, booking)
  // booking = JSON.stringify(booking)
  // console.log(booking)
  // You can use the email, time, and booking values to perform the cancellation logic
  // For example, you can make an API call to cancel the appointment and update the profile

  // Make the API call or perform cancellation logic using the provided information
  // Replace the API_URL with your actual API endpoint for cancelling appointments
  const API_URL = `https://legit-lawyer.onrender.com/client/cancle?email=${email}&&lawyer_id=${booking._id}&&time=${time}`;

  

 await fetch(API_URL)
    .then(response => response.json())
    .then(async data => {
      // Handle the response from the API
      console.log("Appointment cancellation response:", data);
      Swal.fire(
        'Good job!',
        'Appointment cancel ! ',
        'success'
    )
     await fetch(`https://legit-lawyer.onrender.com/client/user?email=${email}`)
  .then(response => response.json())
  .then(data =>{console.log("data",data),updateProfile(data)})
  .catch(error => console.error('Error:', error))
      // Perform any necessary actions based on the response
      // Update the profile or display a success message, etc.
    })
    .catch(error => {
      // Handle any errors that occur during the API request
      console.error("Error cancelling appointment:", error);
    });



    var speciality = document.querySelector('select[name="speciality"]').value;
    //         // Construct the fetch URL with query parameters
    //   var url = ''  + '&speciality=' + encodeURIComponent(speciality);
    
    // Perform the fetch request
    console.log(speciality)
  await  fetch(`https://legit-lawyer.onrender.com/client/get?specialization=${speciality}`)
    .then(function(response) {
    return response.json();
    })
    .then(function(data) {
    // Handle the response data and update the search results
    updateSearchResults(data);
    })
    .catch(function(error) {
    console.log('An error occurred:', error);
    });

    location.reload()
    
}

var Email=localStorage.getItem("user")
var user = JSON.parse(Email)
var clientEmail = user.email
// updateProfile(user)
// console.log("profiledata",user)
// Make the fetch request to retrieve profile data
fetch(`https://legit-lawyer.onrender.com/client/user?email=${clientEmail}`)
  .then(response => response.json())
  .then(data =>{console.log("data",data),updateProfile(data)})
  .catch(error => console.error('Error:', error));



// JavaScript code to handle form submission
  document.getElementById("searchForm").addEventListener("submit", function(event) {
    console.log("hello")
  event.preventDefault(); // Prevent form submission
  
//       var location = document.querySelector('input[name="location"]').value;
  var speciality = document.querySelector('select[name="speciality"]').value;
//         // Construct the fetch URL with query parameters
//   var url = ''  + '&speciality=' + encodeURIComponent(speciality);

// Perform the fetch request
console.log(speciality)
fetch(`https://legit-lawyer.onrender.com/client/get?specialization=${speciality}`)
.then(function(response) {
return response.json();
})
.then(function(data) {
// Handle the response data and update the search results
updateSearchResults(data);
})
.catch(function(error) {
console.log('An error occurred:', error);
});
});


function updateSearchResults(results) {
var searchResultsElement = document.getElementById('searchResults');
searchResultsElement.innerHTML = ''; // Clear previous results

// Iterate over the results and create HTML elements to display them
results.forEach(function(result) {
  var div1 = document.createElement("div")
  var div2 = document.createElement("div")
  div2.id = "div2"
var img = document.createElement("img")
var li = document.createElement('li');
li.id = "LI"
var h2 = document.createElement('h2');
var p1 = document.createElement('p');
var p2 = document.createElement('p');
var p3 = document.createElement('p');
var p4 = document.createElement('p');
var p5 = document.createElement('p');
var p6 = document.createElement('div');
var p7 = document.createElement('button');

h2.textContent = result.name;
img.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHkAAAB5CAMAAAAqJH57AAAAMFBMVEXk5ueutLfn6em7wMKrsbS2u77d3+HLz9Ha3d7V2Nrh4+SorrKzuLvR1NbIzM7FycuQ6gT4AAACiklEQVRoge2a25KkIAxAIYCAov7/3y6jPZe+CIkmUlvFeZyXM4khQGilOp1Op9PpdDqdzjGQuV+qxjD7TBzGG/Wgwuq0fZCMH+5xg/LOWv0Ha024wQ2zftLuTGYUdoNyH7ybexFVQzzwfuXcjYJifyzO6iSW8bI4k4SihrkizsiYw1QVayeRb6h787cWqHBY67nOTPw9BZPrLd/cYmVwYm1n5qALLUQ2aMCGnIOOrOYBLdbacKa72r2eGDjNjiC2M6N5JIi15Uw3vrI3+My0z6w135aF7Jw/BD4zfjV/wbiiSaXNWtyQaGbPVmINze2yTTQzVli7VdWsk7TrnqTtmXeDbrdLwtLqZEBKN+89g3IC5D32li7OL7BfKLE1xti0dyA2u92AaXWjUwqV61VADAERtMjNHbVvSA1Kqp1MbAxZUwvOP0vjIcFx2KYeG00f1dHE1ZobJs2glvQ2ZY53Tbjjn8m6dstw61h/iPOyrj6GW18TYH89ebD/QV4KKuRgjUt7unPDNCaHrkTfcbLUGz1N9rW4838wWbdEkeABstW+OV/8aQnMchh8+rSM3+06rXxygGhQ2m+5mxWHOy/eo4Z5LE/+eg+H6JAHsJfA/bW4IZDj/XVfOXeDORPvj9udTXk+3Z8N+MF08uxNHBR8DPvEc+XxEYCmTtTzNwyJQ6zJFzwIPNpNTfrYA1PAZPV4ZTG9M+HPSqxeihp3aySBuvXQpjE4rMGIiVM3pBpTZbSJMprqqIo64sSCeEoS8er66FkqZF0dJ6Ce9M9hy19apLAf5uLwBjl6OknRLCmeSukeeLeKZ0rdBPMrmQsUWij1jYZIYV3JFpi2he+8GklKY2CQpWDudDqd/4t/JdIc9mEDY54AAAAASUVORK5CYII="
p1.textContent = 'Speciality: ' + result.specialization;
p2.textContent = 'Location: ' + result.location;
p3.textContent = 'Email: ' + result.contact.email;
p4.textContent = 'Contact No: ' + result.contact.phone;
p5.textContent = 'Rating: ' + result.rating;

p7.innerText = 'View slots';
p7.addEventListener('click', createButtonClickListener(result.sloats,result));

div1.appendChild(h2);
div1.appendChild(p1);
div1.appendChild(p2);
div1.appendChild(p3);
div1.appendChild(p4);
div1.appendChild(p5);
div1.appendChild(p6);
div1.appendChild(p7);
div2.appendChild(img)

li.appendChild(div1)
li.appendChild(div2)
searchResultsElement.appendChild(li);
});

// Function factory to create separate event listeners
function createButtonClickListener(sloats,r) {
console.log(sloats)
// console.log(results,"true")//[a,b]
return function() {
  var p6 = this.parentNode.querySelector('div');
  p6.innerHTML = ''; // Clear previous slot buttons

  if (sloats == undefined) {
    p6.innerText = 'Not available';
    // alert("Sloats not available")

    Swal.fire(
      'Good job!',
      'Slots not available!',
      'success'
  )
    
  } else {
    for (var key in sloats) {
      if (sloats.hasOwnProperty(key) && sloats[key] !== "booked") {
        var button = document.createElement('button');
        button.classList = "innerb"
        button.innerText = key;
        button.addEventListener('click', createSlotClickListener(key, sloats[key],r));
        p6.appendChild(button);
      }
    }
  }
};
}

// Function factory to create separate slot click listeners
function createSlotClickListener(slot, slotValue,r) {
return async function() {
  console.log(slot, slotValue,r);

  var Email=localStorage.getItem("user")
  var user = JSON.parse(Email)
  var clientEmail = user.email
  var lawyerId=r._id;
  var bookingsloat = slot
await fetch(`https://legit-lawyer.onrender.com/client/book/?clientEmail=${clientEmail}&&lawyerId=${lawyerId}&&bookingsloat=${bookingsloat}`)
  .then(res=>res.json())
  .then(data=>{Swal.fire(
    'Good job!',
    'Booked !',
    'success'
)})
  .catch((err)=> {Swal.fire({
    title: 'Error!',
    text: 'Something went wrong',
    icon: 'error',
    confirmButtonText: 'Ok'
})})
  localStorage.setItem("id", JSON.stringify(r))



  await fetch(`https://legit-lawyer.onrender.com/client/user?email=${clientEmail}`)
  .then(response => response.json())
  .then(data =>{console.log("data",data),updateProfile(data)})
  .catch(error => console.error('Error:', error)) 


  var speciality = document.querySelector('select[name="speciality"]').value;
//         // Construct the fetch URL with query parameters
//   var url = ''  + '&speciality=' + encodeURIComponent(speciality);

// Perform the fetch request
console.log(speciality)
fetch(`https://legit-lawyer.onrender.com/client/get?specialization=${speciality}`)
.then(function(response) {
return response.json();
})
.then(function(data) {
// Handle the response data and update the search results
updateSearchResults(data);
})
.catch(function(error) {
console.log('An error occurred:', error);
});




   window.location.href = "p.html"


  
};

// 

}
}
