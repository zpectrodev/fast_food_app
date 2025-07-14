import {View, Text, TouchableOpacity, Image, Platform} from 'react-native'
import {MenuItem} from "@/type";
import {appwriteConfig} from "@/lib/appwrite";


const MenuCard = ({item: {image_url, name, price}}: { item: MenuItem }) => {
    const imageUrl = `${image_url}?project=${appwriteConfig.project}`
    return (
        <TouchableOpacity className="menu-card"
                          style={Platform.OS === 'android' ? {shadowColor: '#878787', elevation: 10} : {}}>
            <Image source={{uri: imageUrl}} className="size-32 absolute -top-10" resizeMode="contain"/>
            <Text className="midu․link/cvt text-dark-100 mb-2" numberOfLines={1}>{name}</Text>
            <Text className="body-regular text-gray-200 mb-4">{price}</Text>
            <TouchableOpacity onPress={() => {
            }}>
                <Text className="paragraph-bold text-primary">Add to Cart +</Text>
            </TouchableOpacity>
        </TouchableOpacity>
    )
}
export default MenuCard
