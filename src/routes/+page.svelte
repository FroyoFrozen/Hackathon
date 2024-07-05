<script>
	import FileDrop from './FileDrop.svelte';
	import { db } from './firebase.js';
	import { collection, getDocs } from "firebase/firestore"; 
	import { onMount } from 'svelte';
  
	let tablesData = [];
  
	// Function to fetch data from all collections and documents
	const fetchData = async () => {
	  const collections = ["Docent #1", "Docent #2", "Nederlands #1", "Internationaal #1", "Internationaal #2"];
	  let data = {};
  
	  for (const collectionName of collections) {
		const querySnapshot = await getDocs(collection(db, collectionName));
		if (!querySnapshot.empty) {
		  querySnapshot.forEach((doc) => {
			const dayData = doc.data();
			const day = doc.id;
			if (!data[collectionName]) data[collectionName] = {};
			data[collectionName][day] = dayData;
		  });
		}
	  }
  
	  // Days order
	  const daysOrder = ["Maandag", "Dinsdag", "Woensdag", "Donderdag", "Vrijdag"];
  
	  // Format the data into table structure
	  tablesData = collections.map((collectionName) => {
		const days = data[collectionName] || {};
		if (Object.keys(days).length > 0) {
		  return {
			collection: collectionName,
			days: Object.keys(days)
			  .map(day => ({
				day,
				...days[day]
			  }))
			  .sort((a, b) => daysOrder.indexOf(a.day) - daysOrder.indexOf(b.day)) // Sort by days order
		  };
		} else {
		  return null; // Skip empty collections
		}
	  }).filter(table => table !== null); // Remove null entries
	};
  
	onMount(async () => {
	  await fetchData();
	});
  
	function getClass(value) {
	  if (value === "Les") return "les";
	  if (value === "Niks") return "niks";
	  if (value === "Toets") return "toets";
	  return "";
	}
  </script>
  
  <svelte:head>
	<title>Schedule Dashboard</title>
	<meta name="description" content="Svelte demo app" />
  </svelte:head>
  
  <section>
	<h1>Schedule Dashboard</h1>
	<FileDrop />
	{#each tablesData as {collection, days}}
	  <h2>{collection}</h2>
	  <table>
		<thead>
		  <tr>
			<th>Day</th>
			<th>08u</th>
			<th>09u</th>
			<th>10u</th>
			<th>11u</th>
			<th>12u</th>
			<th>13u</th>
			<th>14u</th>
			<th>15u</th>
			<th>16u</th>
			<th>17u</th>
		  </tr>
		</thead>
		<tbody>
		  {#each days as day}
			<tr>
			  <td>{day.day}</td>
			  <td class={getClass(day["08u"])}>{day["08u"]}</td>
			  <td class={getClass(day["09u"])}>{day["09u"]}</td>
			  <td class={getClass(day["10u"])}>{day["10u"]}</td>
			  <td class={getClass(day["11u"])}>{day["11u"]}</td>
			  <td class={getClass(day["12u"])}>{day["12u"]}</td>
			  <td class={getClass(day["13u"])}>{day["13u"]}</td>
			  <td class={getClass(day["14u"])}>{day["14u"]}</td>
			  <td class={getClass(day["15u"])}>{day["15u"]}</td>
			  <td class={getClass(day["16u"])}>{day["16u"]}</td>
			  <td class={getClass(day["17u"])}>{day["17u"]}</td>
			</tr>
		  {/each}
		</tbody>
	  </table>
	{/each}
  </section>
  
  <style>
	section {
	  display: flex;
	  flex-direction: column;
	  justify-content: center;
	  align-items: center;
	  flex: 0.6;
	}
  
	h1, h2 {
	  width: 100%;
	  text-align: center;
	}
  
	table {
	  width: 100%;
	  border-collapse: collapse;
	  margin-bottom: 20px;
	}
  
	th, td {
	  border: 1px solid #ddd;
	  padding: 8px;
	}
  
	th {
	  background-color: #f2f2f2;
	}
  
	tr:nth-child(even) {
	  background-color: #f9f9f9;
	}
  
	.les {
	  background-color: #a8e6a1; /* light green */
	}
  
	.niks {
	  background-color: #f8b8b8; /* light red */
	}
  
	.toets {
	  background-color: #add8e6; /* light blue */
	}
  </style>
  