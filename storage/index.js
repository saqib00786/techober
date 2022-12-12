import AsyncStorage from "@react-native-async-storage/async-storage"
import Toast from "react-native-root-toast"

export const onBookmarkBlog = async (id, blogObject = null) => {
    let stringId = id.toString()
    try {
        await AsyncStorage.setItem(stringId, JSON.stringify(blogObject))
        Toast.show('Item Marked', { duration: Toast.durations.SHORT })
    } catch (error) {
        Toast.show(e, { duration: Toast.durations.SHORT })
    }

}

export const onBookmarkRemove = async (id) => {
    let stringId = id.toString()
    try {
        await AsyncStorage.removeItem(stringId);
        Toast.show("ٰItem Marked Removed", { duration: Toast.durations.SHORT })
    } catch (error) {
        Toast.show(e, { duration: Toast.durations.SHORT })
    }
}

export const getSingleBlogData = async (id) => {
    let stringId = id.toString()
    try {
        let result = await AsyncStorage.getItem(stringId)
        if (!result) return
        return result
    } catch (error) {

    }
}

export const getAllBookmark = async () => {
    const keys = await AsyncStorage.getAllKeys()
    const result = await AsyncStorage.multiGet(keys)
    return result
}

export const removeBookmark = async (id, cb = null) => {
    try {
        await AsyncStorage.removeItem(id);
        if (typeof (cb) == 'function') {
            cb(true);
        }
        Toast.show("ٰItem Deleted Successfully", { duration: Toast.durations.SHORT })
        // navigation && navigation.goBack()
    } catch (e) {
        Toast.show(e, { duration: Toast.durations.SHORT })
    }
}
