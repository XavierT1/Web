<template>
  <div class="approval-page">
    <h1>Aprobación de Candidatos</h1>

    <CandidateForm
      @add-candidate="addCandidate"
    />

    <CandidateList
      :candidates="candidates"
    />
  </div>
</template>

<script>
import CandidateForm from '@/components/CandidateForm.vue'
import CandidateList from '@/components/CandidateList.vue'

export default {
  name: 'ApprovalPage',
  components: {
    CandidateForm,
    CandidateList
  },
  data() {
    return {
      // Estado central que contiene todos los candidatos agregados
      candidates: []
    }
  },
  methods: {
    // Este método se activa cuando el componente CandidateForm emite el evento 'add-candidate'
    addCandidate(newCandidate) {
      // P2: Se agrega el candidato recibido a la lista
      this.candidates.push(newCandidate);
      
      console.log('Candidato agregado:', newCandidate);
    }
  }
}
</script>

<style scoped>
.approval-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: Arial, sans-serif;
}

h1 {
    color: #333;
    border-bottom: 2px solid #ccc;
    padding-bottom: 10px;
}
</style>