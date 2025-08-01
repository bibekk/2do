//export const base_url='http://192.168.1.246:8080'

export const base_url = () => {
  return `http://${window.location.hostname}:8080`
}

export const ws_base_url = () => {
  return `ws://${window.location.hostname}:8081`
}