import {Account, Avatars, Client, Databases, ID, Query, Storage} from "react-native-appwrite";
import {CreateUserParams, GetMenuParams, SignInParams} from "@/type";

export const appwriteConfig = {
    endpoint: process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT,
    project: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID,
    platform: "com.zd.foodordering",
    databaseId: "686f23960035f60aa275",
    userColletionId: "686f23e3003a3c0d4c79",
    categoriesCollectionId: "6871629400345f69d023",
    menuCollectionId: "687163dd0020b6088c2a",
    customizationsCollectionId: "687165eb003922ad74e1",
    menuCustomizationsCollectionId: "6871670f003b27ccc596",
    bucketId: "6871683d00125d182f93"
}

export const client = new Client();

client
    .setEndpoint(appwriteConfig.endpoint ?? "")
    .setProject(appwriteConfig.project ?? "")
    .setPlatform(appwriteConfig.platform)

export const account = new Account(client);
export const databases = new Databases(client)
export const storage = new Storage(client);
const avatars = new Avatars(client)

export const createUser = async ({email, password, name}: CreateUserParams) => {
    try {
        const newAccount = await account.create(ID.unique(), email, password, name)
        if (!newAccount) throw Error;

        await signIn({email, password});

        const avatarUrl = avatars.getInitialsURL(name);

        return await databases.createDocument(
            appwriteConfig.databaseId,
            appwriteConfig.userColletionId,
            ID.unique(),
            {email, name, accountId: newAccount.$id, avatar: avatarUrl}
        );
    } catch (e) {
        throw new Error(e as string);
    }
}

export const signIn = async ({email, password}: SignInParams) => {
    try {
        const session = await account.createEmailPasswordSession(email, password);
    } catch (e) {
        throw new Error(e as string);
    }
}

export const getCurrentUser = async () => {
    try {
        const currentAccount = await account.get();
        if (!currentAccount) throw Error;

        const cuurentUser = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.userColletionId,
            [Query.equal('accountId', currentAccount.$id)]
        )

        if (!cuurentUser) throw Error;

        return cuurentUser.documents[0];

    } catch (e) {
        console.log(e as string);
        throw new Error(e as string);
    }
}

export const getMenu = async ({category, query}: GetMenuParams) => {
    try {
        const queries: string[] = [];

        if (category) queries.push(Query.equal('categories', category));
        if (query) queries.push(Query.search('name', query));

        const menus = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.menuCollectionId,
            queries,
        )

        return menus.documents;
    } catch (e) {
        throw new Error(e as string);
    }
}
export const getCategories = async () => {
    try {
        const categories = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.categoriesCollectionId,
        )

        return categories.documents;
    } catch (e) {
        throw new Error(e as string);
    }
}