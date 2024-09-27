export const generateOptions = (data, isLoading, labelKey, valueKey) => {
    // console.log(labelKey, valueKey)
    if (isLoading) {
        return [{ label: 'Loading...', value: '' }]
    }

    return (
        data?.map((item) => ({
            id: item.id,
            label: item[labelKey],
            value: item[valueKey],
        })) || []
    )
}
