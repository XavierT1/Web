<template>
  <div class="list-container">
    <table>
      <thead>
        <tr>
          <th>Título</th>
          <th>Nombre</th>
          <th>Apellido</th>
          <th>Atributo 5 (País)</th>
          <th>Atributo 6 (Email)</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(candidate, index) in candidates" :key="index">
          <td>{{ candidate.title }}</td>
          <td>{{ candidate.firstName }}</td>
          <td>{{ candidate.lastName }}</td>
          <td>{{ candidate.attr5 }}</td>
          <td>{{ candidate.attr6 }}</td>
        </tr>
        <tr v-if="candidates.length === 0">
          <td colspan="5" class="empty-row">No hay candidatos agregados aún.</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: 'CandidateList',
  // Pasa la lista de candidatos desde el componente Padre usando PROPS 
  props: {
    candidates: {
      type: Array,
      required: true,
      default: () => []
    }
  }
}
</script>

<style scoped>
.list-container {
  margin: 30px auto;
  width: 80%;
  box-shadow: 0 0 10px rgba(0,0,0,0.1);
}

table {
  width: 100%;
  border-collapse: collapse;
}

th, td {
  border: 1px solid #ddd;
  padding: 10px;
  text-align: left;
}

th {
  background-color: #f2f2f2;
  font-weight: bold;
}

.empty-row {
  text-align: center;
  font-style: italic;
  color: #777;
}
</style>