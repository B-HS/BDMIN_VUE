<template>
    <ul class="menu w-full">
        <li><a>Item 1</a></li>
        <li>
            <a>Parent</a>
            <ul>
                <li><a>level 2 item 1</a></li>
                <li><a>level 2 item 2</a></li>
                <li>
                    <a>Parent</a>
                    <ul>
                        <li><a>level 3 item 1</a></li>
                        <li><a>level 3 item 2</a></li>
                    </ul>
                </li>
            </ul>
        </li>
        <li><a>Item 3</a></li>
    </ul>
</template>
<script setup lang="ts"></script>
