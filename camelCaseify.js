    const camelCaseify = (source) => {
        if (!source || (!Array.isArray(source) && typeof source !== 'object')) {
            return source;
        }

        if (Array.isArray(source)) {
            const newArray = [];
            for (const i of source) {
                newArray.push(camelCaseify(i));
            }

            return newArray;
        }

        const replacement = {};
        for (const k in source) {
            const newkey = k[0].toLowerCase() + k.substring(1);
            replacement[newkey] = camelCaseify(source[k]);
        }
        return replacement;
    };
