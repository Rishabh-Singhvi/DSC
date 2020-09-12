<template>
    <div class="columns main">
        <div class="column card is-4 align-self-center">
            <div class="card-header ">
                <span class="is-size-1 has-text-centered">
                    Login
                </span>
            </div>
            <div class="card-content">
                <b-field label="Email">
                    <b-input type="email" v-model="email"></b-input>
                </b-field>
                <b-field label="Password">
                    <b-input v-model="password" type="password"></b-input>
                </b-field>
                <b-button @click="login" type="is-success">Login</b-button>
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
                    disabled
                    class="column is-4">
                    Github
                </b-button>
            </div>
        </div>
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
        }
    },
    methods: {
        login() {
            var self = this
            firebaseApp.auth.signInWithEmailAndPassword(this.email, this.password).then(data => {
                firebaseApp.db.collection('users').doc(data.user.uid).get().then(user => {
                    self.$store.commit('setUser', [true, user.data()])
                    self.$buefy.toast.open({
                        type: 'is-success',
                        message: 'Logged in'
                    })
                    self.$router.push('/')
                })
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
        google() {
            var provider = new firebase.auth.GoogleAuthProvider()
            firebaseApp.auth.signInWithPopup(provider).then(data => {
                var user = data.user
                console.log(user)
                firebaseApp.db.collection('users').doc(user.uid).get().then(data => {
                    console.log(data)
                    if(!data.exists) {
                        this.$buefy.snackbar.open({
                            message: 'Some error occured try registering',
                            type: 'is-warning',
                            position: 'is-top',
                            actionText: 'Register',
                            onAction: () => {
                                this.$router.push('/register')
                            }
                        })
                    } else {
                        this.$store.commit('setUser', [true, data.data()])
                        this.$buefy.toast.open({
                            type: 'is-success',
                            message: 'Logged in'
                        })
                        this.$router.push('/')
                    }
                }).catch(error => {
                    console.log(error)
                    this.$buefy.snackbar.open({
                        message: 'Some error occured try registering',
                        type: 'is-warning',
                        position: 'is-top',
                        actionText: 'Register',
                        onAction: () => {
                            this.$router.push('/register')
                        }
                    })
                })
            }).catch(error => {
                console.log(error)
                this.$buefy.snackbar.open({
                    message: 'Some error occured try registering',
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
                var user = data.user
                console.log(user)
                firebaseApp.db.collection('users').doc(user.uid).get().then(data => {
                    console.log(data)
                    if(!data.exists) {
                        this.$buefy.snackbar.open({
                            message: 'Some error occured try registering',
                            type: 'is-warning',
                            position: 'is-top',
                            actionText: 'Register',
                            onAction: () => {
                                this.$router.push('/register')
                            }
                        })
                    }
                }).catch(error => {
                    console.log(error)
                    this.$buefy.snackbar.open({
                        message: 'Some error occured try registering',
                        type: 'is-warning',
                        position: 'is-top',
                        actionText: 'Register',
                        onAction: () => {
                            this.$router.push('/register')
                        }
                    })
                })
            }).catch(error => {
                console.log(error)
                this.$buefy.snackbar.open({
                    message: 'Some error occured try registering',
                    type: 'is-warning',
                    position: 'is-top',
                    actionText: 'Register',
                    onAction: () => {
                        this.$router.push('/register')
                    }
                })
            })
        }
    }
}
</script>