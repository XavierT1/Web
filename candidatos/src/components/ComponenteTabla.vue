<template>
  <div class="contenedor-tabla">
    <table>
      <thead>
        <tr>
          <th>Título</th>
          <th>Nombre</th>
          <th>Apellido</th>
          <th>Email</th>
          <th>Género</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in lista" :key="index">
          <td>{{ item.titulo }}</td>
          <td>{{ item.nombre }}</td>
          <td>{{ item.apellido }}</td>
          <td>{{ item.email }}</td>
          <td>{{ item.genero }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  props: ['lista']
}
</script>

<style scoped>
.contenedor-tabla {
  margin-top: 30px;
  display: flex;
  justify-content: center;
}
table {
  border-collapse: collapse;
  width: 80%;
}
th {
  color: blue;
  border: 1px solid blue;
  padding: 10px;
}
td {
  border: 1px solid blue; 
  padding: 10px;
  color: #008fca;
}
</style>