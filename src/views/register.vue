<template>
    <div class="columns main">
        <div class="column card is-6 align-self-center">
            <div class="card-header ">
                <span class="is-size-1 has-text-centered">
                    Register
                </span>
            </div>
            <div class="card-content">
                <div class="columns">
                    <b-field label="Name" class="column">
                        <b-input type="text" v-model="name"></b-input>
                    </b-field>
                    <b-field label="phone" class="column">
                        <b-input v-model="phone" type="tel"></b-input>
                    </b-field>
                </div>
                <div class="columns">
                    <b-field label="Year" class="column">
                        <b-input type="number" v-model="year"></b-input>
                    </b-field>
                    <b-field label="Branch" class="column">
                        <b-input v-model="branch" type="text"></b-input>
                    </b-field>
                </div>
                <b-field label="Email">
                    <b-input type="email" v-model="email"></b-input>
                </b-field><b-field label="Password">
                    <b-input v-model="password" type="password"></b-input>
                </b-field>
                <b-button @click="login" type="is-success">Register</b-button>
            </div>
            <span>Sign in using</span>
            <div class="card-footer columns" style="padding: 20px">
                <b-button type="is-danger"
                    @click="google"
                    class="column is-4">
                    Google
                </b-button>
                <b-button type="is-danger"
                    @click="github"
                    class="column is-4">
                    Github
                </b-button>
            </div>
        </div>
        <b-modal 
            v-model="isComponentModalActive"
            has-modal-card
            trap-focus
            :destroy-on-hide="false"
            aria-role="dialog"
            aria-modal>
            <div class="card">
                <div class="columns">
                    <div class="columns">
                        <b-field label="Year" class="column">
                            <b-input type="number" v-model="year"></b-input>
                        </b-field>
                        <b-field label="Branch" class="column">
                            <b-input v-model="branch" type="text"></b-input>
                        </b-field>
                    </div>
                </div>
                <b-button type="is-success" @click="submit">Register</b-button>
            </div>
        </b-modal>
    </div>
</template>

<style scoped>
.main {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 95vh;
    background-image: url('../assets/back.png');
    background-size: cover;
    background-repeat: no-repeat;
}
.card-footer {
    display: flex;
    align-items: center;
    justify-content: space-evenly;
}
</style>

<script>
import firebase from 'firebase'
import firebaseApp from '../firebase_init'
export default {
    name: 'Login',
    data() {
        return {
            email: '',
            password: '',
            name: '',
            phone: '',
            year: 1,
            branch: '',
            isComponentModalActive: false,
            user: {}
        }
    },
    methods: {
        login() {
            var self = this
            firebaseApp.auth.createUserWithEmailAndPassword(this.email, this.password).then(data => {
                console.log(data.user)
                var temp = {
                    email: this.email,
                    name: this.name,
                    phone: this.phone,
                    year: this.year,
                    branch: this.branch
                }
                firebaseApp.db.collection('users').doc(data.user.uid).set(temp).then(done => {
                    console.log(done, '==================')
                    console.log(self.name)
                    self.$store.commit('setUser', [true, temp])
                    this.$buefy.toast.open({
                        message: 'Registered',
                        type: 'is-success'
                    })
                    this.$router.push('/')
                })
            }).catch(error => {
                this.$buefy.snackbar.open({
                    message: error.message + '\n try contacting the core',
                    type: 'is-warning',
                    position: 'is-top',
                })
            })
        },
        google() {
            var provider = new firebase.auth.GoogleAuthProvider()
            firebaseApp.auth.signInWithPopup(provider).then(data => {
                this.user = data.user
                this.isComponentModalActive = true;
            }).catch(error => {
                console.log(error)
                this.$buefy.snackbar.open({
                    message: error.message,
                    type: 'is-warning',
                    position: 'is-top',
                    actionText: 'Register',
                    onAction: () => {
                        this.$router.push('/register')
                    }
                })
            })
        },
        github() {
            var provider = new firebase.auth.GithubAuthProvider()
            firebaseApp.auth.signInWithPopup(provider).then(data => {
                this.user = data.user
                this.isComponentModalActive = true;
            }).catch(error => {
                console.log(error)
                this.$buefy.snackbar.open({
                    message: error.message,
                    type: 'is-warning',
                    position: 'is-top',
                    actionText: 'Register',
                    onAction: () => {
                        this.$router.push('/register')
                    }
                })
            })
        },
        submit() {
            var self = this
            var temp = {
                email: this.user.email,
                name: this.user.displayName,
                phone: '',
                year: this.year,
                branch: this.branch
            }
            console.log(temp, '===============')
            firebaseApp.db.collection('users').doc(this.user.uid).set(temp).then(done => {
                console.log(done, '==================')
                console.log(self.name)
                self.$store.commit('setUser', [true, temp])
                this.$buefy.toast.open({
                    message: 'Register',
                    type: 'is-success'
                })
                this.$router.push('/')
            }).catch(error => {
                this.$buefy.snackbar.open({
                    message: error.message + '\n try contacting the core',
                    type: 'is-warning',
                    position: 'is-top',
                })
            })
        }
    }
}
</script>