<script>
	import Counter from './Counter.svelte';
	import welcome from '$lib/images/svelte-welcome.webp';
	import welcome_fallback from '$lib/images/svelte-welcome.png';
	import FileDrop from './FileDrop.svelte';
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
  