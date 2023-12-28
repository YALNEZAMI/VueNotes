<script setup>
import { useRouter, useRoute } from "vue-router";

// Obtenir l'objet router
const router = useRouter();

let notes = JSON.parse(localStorage.getItem("notes"));
const route = useRoute();
let id = route.params.id;
let note = notes.find((note) => note.id == id);

// Fonction pour mettre à jour la note et naviguer vers la route '/'
const update = () => {
  notes = notes.map((mapNote) => {
    if (mapNote.id == id) {
      return note;
    }
    return mapNote;
  });

  localStorage.setItem("notes", JSON.stringify(notes));

  // Utilisation de 'router' pour naviguer vers la route '/'
  router.push("/");
};
</script>

<template>
  <main class="mt-12">
    <form
      @submit.prevent="update"
      class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
    >
      <div class="mb-4">
        <label
          class="block text-gray-700 text-sm font-bold mb-2"
          for="username"
        >
          Note title
        </label>
        <input
          v-model.trim="note.title"
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
          v-model.trim="note.details"
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
          v-model.trim="note.date"
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          type="datetime-local"
          placeholder="Visit Mom"
          required
        />
      </div>

      <div class="flex items-center justify-between">
        <button
          class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
        >
          modify
        </button>
        <button
          @click="
            $router.push({
              path: '/',
            })
          "
          class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="button"
        >
          cancel
        </button>
      </div>
    </form>
  </main>
</template>
<style scoped></style>
