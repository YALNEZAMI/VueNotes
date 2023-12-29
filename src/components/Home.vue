<script setup>
import { ref, watch } from "vue";
//getting the notes from local storage
let storedNotes = localStorage.getItem("notes");
//if there is no notes in local storage, we set an empty array
if (storedNotes) {
  storedNotes = JSON.parse(storedNotes);
} else {
  storedNotes = [];
}
const notes = ref([]);
//we set the notes array to the stored notes
notes.value = storedNotes;
let title = ref("");
let details = ref("");
let date = ref("");
let adding = ref(false);
let search = ref(""); //search input word key
let preciseNote = ref({
  title: "title",
  details: "desc",
  date: new Date().toLocaleString().replace(/T/, " "),
  color: "",
});
let showPreciseNoteBool = ref(false);
//watching for changes in the search input
watch(search, () => {
  notes.value = storedNotes.filter((note) =>
    note.title.toLowerCase().includes(search.value.toLowerCase())
  );
});

const add = () => {
  //validation
  if (!title.value || !details.value || !date.value)
    return alert("Please fill all fields");
  //creation of the note object
  let note = {
    id: Math.random(),
    title: title.value,
    details: details.value,
    date: date.value.toLocaleString().replace(/T/, " "),
    color: "hsl(" + Math.random() * 360 + ", 100%, 75%)",
  };
  //adding the note to the notes array
  notes.value.push(note);
  //hide the overlay
  adding.value = !adding.value;
  //reset the form
  title.value = "";
  details.value = "";
  //set local storage
  localStorage.setItem("notes", JSON.stringify(notes.value));
};
const deleteNote = (id) => {
  //filtering the notes array
  notes.value = notes.value.filter((note) => note.id !== id);
  //set local storage
  localStorage.setItem("notes", JSON.stringify(notes.value));
};
const getShortTitle = (title) => {
  if (title.length > 10) {
    return title.slice(0, 10) + "...";
  }
  return title;
};
const getShortDetails = (details) => {
  if (details.length > 30) {
    return details.slice(0, 80) + "...";
  }
  return details;
};
const showPreciseNote = (note) => {
  preciseNote.value = note;
  showPreciseNoteBool.value = true;
};
</script>

<template>
  <div
    class="preciseNote bg-gray-700 text-white rounded p-4 text-center"
    v-if="showPreciseNoteBool"
  >
    <h3 class="text-xl font-bold">{{ preciseNote.title }}</h3>
    <hr />
    <div class="my-2">{{ preciseNote.details }}</div>
    <hr />
    <div class="my-2">{{ preciseNote.date }}</div>
    <button
      @click="showPreciseNoteBool = false"
      class="bg-red-700 hover:bg-red-500 p-1 rounded mt-2"
    >
      close
    </button>
  </div>
  <div class="overlay" v-if="adding">
    <div class="w-full max-w-xs">
      <form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div class="mb-4">
          <label
            class="block text-gray-700 text-sm font-bold mb-2"
            for="username"
          >
            Note title
          </label>
          <input
            v-model="title"
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            placeholder="Visit Mom"
            required
          />
        </div>
        <div class="mb-6">
          <label
            class="block text-gray-700 text-sm font-bold mb-2"
            for="password"
          >
            Details
          </label>
          <textarea
            v-model="details"
            class="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            placeholder="Buy her a flour ..."
            required
          ></textarea>
        </div>
        <div class="mb-4">
          <label
            class="block text-gray-700 text-sm font-bold mb-2"
            for="username"
          >
            Date de l'événement
          </label>
          <input
            v-model="date"
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="datetime-local"
            placeholder="Visit Mom"
            required
          />
        </div>

        <div class="flex items-center justify-between">
          <button
            @click="add"
            class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button"
          >
            Add
          </button>
          <button
            @click="adding = false"
            class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button"
          >
            close
          </button>
        </div>
      </form>
    </div>
  </div>
  <div class="container">
    <header class="flex bg-teal-300">
      <h1 class="text-4xl mx-4 my-">Notes</h1>
      <button
        @click="adding = true"
        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded my-1"
      >
        +
      </button>
    </header>
    <div class="bg-teal-400 m-1">
      <input
        class="placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
        placeholder="Search for a notes..."
        type="text"
        v-model="search"
      />
    </div>

    <main class="bg-teal-700 min-h-screen">
      <div v-if="notes.length == 0" class="noNotes my-3 text-center text-2xl">
        No note yet, add some !
      </div>

      <div class="flex flex-wrap">
        <div
          v-for="note in notes"
          :key="note.id"
          class="card mx-2 my-2 px-1 py-1 rounded"
          :style="{ backgroundColor: note.color }"
        >
          <h3 class="text-2xl text-center my-1">
            <ins>{{ getShortTitle(note.title) }}</ins>
          </h3>

          <p class="details text-sm text-center">
            {{ getShortDetails(note.details) }}
            <span
              @click="showPreciseNote(note)"
              class="cursor-pointer text-blue-500"
              v-if="note.title.length > 10 || note.details.length > 30"
              >voir plus</span
            >
          </p>
          <div class="my-1 text-center text-xs font-bold">{{ note.date }}</div>
          <div class="text-center">
            <button @click="deleteNote(note.id)" class="text-red-700 h-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-6 h-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5m6 4.125 2.25 2.25m0 0 2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z"
                />
              </svg>
            </button>
            <button
              @click="
                $router.push({
                  path: '/modify/' + note.id,
                })
              "
              class="text-green-700 ml-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-6 h-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<style scoped>
.preciseNote {
  position: fixed;
  top: 0;
  left: 0;
  width: 80%;
  margin-left: 10%;
  margin-top: 20%;
  height: max-content;
  z-index: 100;
}
.details {
  height: 55%;
}
.card {
  width: 150px;
  height: 200px;
  background-color: aquamarine;
  overflow: hidden;
}

.overlay {
  background-color: rgba(0, 0, 0, 0.5);
  position: fixed;
  top: 0;
  left: 0;
  min-height: 100vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
