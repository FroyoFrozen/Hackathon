<script>
	import FileDrop from './FileDrop.svelte';
	import { db } from './firebase.js';
	import { doc, getDoc } from "firebase/firestore"; 
	import { onMount } from 'svelte';
  
	let testing = '';
  
	// Ophalen van data uit Firestore zodra de component gemount is
	onMount(async () => {
	  try {
		const docRef = doc(db, "test", "Fdox5QjrGrS38nSllQia");
		const docSnap = await getDoc(docRef);
  
		if (docSnap.exists()) {
		  console.log("Document data:", docSnap.data()); // Voeg deze regel toe om de volledige documentgegevens te loggen
		  testing = docSnap.data().string;
		} else {
		  console.log("No such document!");
		}
	  } catch (error) {
		console.error("Error getting document: ", error);
	  }
	});
  </script>
  
  <svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte demo app" />
  </svelte:head>
  
  <section>
	<h1>
		Dashboard
	</h1>
	<FileDrop />
	<p>{testing}</p> <!-- Hier wordt de string weergegeven -->
  </section>
  
  <style>
	section {
	  display: flex;
	  flex-direction: column;
	  justify-content: center;
	  align-items: center;
	  flex: 0.6;
	}
  
	h1 {
	  width: 100%;
	}
  </style>
  