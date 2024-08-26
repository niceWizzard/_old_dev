<script setup lang="ts">
    import _data from '@/assets/data.json';

    const data = ref(_data)
    const formData = ref({
        name: '',
        age: 0
    })

    function handleSubmit(e : Event) {
        e.preventDefault()
        if(!formData.value.name || !formData.value.age) return alert('Please fill all fields');
        data.value.push(formData.value )
        formData.value = {
            name: '',
            age: 0
        }
    }

</script>

<template>
    <form @submit="handleSubmit">
        <input type="text" placeholder="name" v-model="formData.name">
        <input type="number" placeholder="age" v-model="formData.age">
        <button type="submit">Submit</button>
    </form>    
    <div v-for="d in data">
        <span>{{ d.name }}   - </span>
        <span>{{ d.age }}</span>
    </div>
</template>