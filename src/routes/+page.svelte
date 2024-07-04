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
  
	.welcome {
	  display: block;
	  position: relative;
	  width: 100%;
	  height: 0;
	  padding: 0 0 calc(100% * 495 / 2048) 0;
	}
  
	.welcome img {
	  position: absolute;
	  width: 100%;
	  height: 100%;
	  top: 0;
	  display: block;
	}
  </style>
  