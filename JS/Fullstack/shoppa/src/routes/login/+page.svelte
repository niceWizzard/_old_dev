<script>
    let username = '';
    let password = '';

    function handleLogin() {
        
    }
</script>

<main>
    <h1>Login</h1>
    <form on:submit|preventDefault={handleLogin}>
        <label for="username">Username:</label>
        <input type="text" id="username" bind:value={username} />

        <label for="password">Password:</label>
        <input type="password" id="password" bind:value={password} />

        <button type="submit">Login</button>
    </form>
</main>

<style>
    main {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 100vh;
    }

    form {
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }

    label {
        font-weight: bold;
    }

    input {
        padding: 0.5rem;
        border-radius: 4px;
        border: 1px solid #ccc;
    }

    button {
        padding: 0.5rem 1rem;
        border-radius: 4px;
        background-color: #007bff;
        color: #fff;
        border: none;
        cursor: pointer;
    }
</style>
